import { useEffect, useRef, useState } from "react";
import { Circle, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "@/components/ui/tooltip";
import { LabelChip } from "@/components/label-chip";
import { useI18n } from "@/i18n/context";
import { cn, clamp, formatTime } from "@/lib/utils";
import { drawFrame, drawPlaceholder, type FitMode, type SliderAxis } from "@/lib/draw";
import { allocTake, sampleRecorded, type MotionMode } from "@/lib/record";
import {
  PHASE_META,
  PHASE_ORDER,
  phaseAtTime,
  sliderAtTime,
  type EasingId,
  type PhaseId,
  type Phases,
  EASINGS,
} from "@/lib/timeline";
import type { OverlayLabel } from "@/lib/labels";
import type { SlotImage } from "@/lib/load-image";
import {
  DEFAULT_PLACEMENT,
  baseSize,
  handleCursor,
  hitHandle,
  imageRect,
  intersect,
  nearSlider,
  panPlacement,
  pointInRect,
  resizePlacement,
  sourceSize,
  visibleRegion,
  type ImagePlacement,
  type ImageRect,
  type ResizeHandle,
} from "@/lib/placement";

type SlotKey = "before" | "after";

function phaseLabelKey(id: PhaseId, axis: SliderAxis): string {
  const v = axis === "vertical";
  switch (id) {
    case "waitStart":
      return v ? "phase.waitStartV" : "phase.waitStartH";
    case "moveRight":
      return v ? "phase.moveOutV" : "phase.moveOutH";
    case "waitRight":
      return v ? "phase.waitFarV" : "phase.waitFarH";
    case "moveLeft":
      return v ? "phase.moveBackV" : "phase.moveBackH";
    case "waitEnd":
      return v ? "phase.waitHomeV" : "phase.waitHomeH";
  }
}

function BoxHandles({ vis }: { vis: ImageRect }) {
  if (vis.w < 12 || vis.h < 12) return null;
  const pts: { id: ResizeHandle; x: number; y: number }[] = [
    { id: "nw", x: vis.x, y: vis.y },
    { id: "n", x: vis.x + vis.w / 2, y: vis.y },
    { id: "ne", x: vis.x + vis.w, y: vis.y },
    { id: "e", x: vis.x + vis.w, y: vis.y + vis.h / 2 },
    { id: "se", x: vis.x + vis.w, y: vis.y + vis.h },
    { id: "s", x: vis.x + vis.w / 2, y: vis.y + vis.h },
    { id: "sw", x: vis.x, y: vis.y + vis.h },
    { id: "w", x: vis.x, y: vis.y + vis.h / 2 },
  ];
  return (
    <>
      <div
        className="pointer-events-none absolute border border-paper/80"
        style={{ left: vis.x, top: vis.y, width: vis.w, height: vis.h }}
      />
      {pts.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-[1px] border border-paper-fg bg-paper"
          style={{ left: p.x, top: p.y }}
        />
      ))}
    </>
  );
}

type DragState =
  | { kind: "slider" }
  | { kind: "pan"; slot: SlotKey; start: ImagePlacement; x: number; y: number }
  | {
      kind: "resize";
      slot: SlotKey;
      handle: ResizeHandle;
      startRect: ImageRect;
      displayed: ImageRect;
      x: number;
      y: number;
      baseW: number;
      baseH: number;
    };

function applyDragCursor(c: string) {
  document.body.style.cursor = c;
  document.documentElement.style.cursor = c;
}

function clearDragCursor() {
  document.body.style.cursor = "";
  document.documentElement.style.cursor = "";
}

export function PreviewStage({
  before,
  after,
  seconds,
  duration,
  easing,
  fit,
  showLine,
  playing,
  loop,
  currentTime,
  outW,
  outH,
  exporting,
  exportRatio,
  motionMode,
  axis,
  fps,
  recording,
  take,
  beforeLabel,
  afterLabel,
  beforePlacement,
  afterPlacement,
  active,
  onTogglePlay,
  onPause,
  onSeek,
  onRestart,
  onLoopChange,
  onTimeTick,
  onRecordStart,
  onRecordComplete,
  onBeforeLabel,
  onAfterLabel,
  onBeforePlacement,
  onAfterPlacement,
  onActive,
}: {
  before: SlotImage | null;
  after: SlotImage | null;
  seconds: Phases;
  duration: number;
  easing: EasingId;
  fit: FitMode;
  showLine: boolean;
  playing: boolean;
  loop: boolean;
  currentTime: number;
  outW: number;
  outH: number;
  exporting: boolean;
  exportRatio: number;
  motionMode: MotionMode;
  axis: SliderAxis;
  fps: number;
  recording: boolean;
  take: Float32Array | null;
  beforeLabel: OverlayLabel;
  afterLabel: OverlayLabel;
  beforePlacement: ImagePlacement;
  afterPlacement: ImagePlacement;
  active: SlotKey;
  onTogglePlay: () => void;
  onPause: () => void;
  onSeek: (t: number) => void;
  onRestart: () => void;
  onLoopChange: (v: boolean) => void;
  onTimeTick: (t: number) => void;
  onRecordStart: () => void;
  onRecordComplete: (samples: Float32Array) => void;
  onBeforeLabel: (l: OverlayLabel) => void;
  onAfterLabel: (l: OverlayLabel) => void;
  onBeforePlacement: (p: ImagePlacement) => void;
  onAfterPlacement: (p: ImagePlacement) => void;
  onActive: (s: SlotKey) => void;
}) {
  const { t } = useI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(currentTime);
  const playingRef = useRef(playing);
  const loopRef = useRef(loop);
  const durationRef = useRef(duration);
  const motionModeRef = useRef(motionMode);
  const axisRef = useRef(axis);
  const fpsRef = useRef(fps);
  const recordingRef = useRef(recording);
  const takeRef = useRef(take);
  const liveProgressRef = useRef(0);
  const viewLiveRef = useRef(motionMode === "manual");
  const secondsRef = useRef(seconds);
  const easingRef = useRef(easing);
  const fitRef = useRef(fit);
  const showLineRef = useRef(showLine);
  const beforeLabelRef = useRef(beforeLabel);
  const afterLabelRef = useRef(afterLabel);
  const beforePlaceRef = useRef(beforePlacement);
  const afterPlaceRef = useRef(afterPlacement);
  const progressRef = useRef(0);
  const finishingRef = useRef(false);
  const recordStartRef = useRef(0);
  const recordLastRef = useRef(-1);
  const recordWorkingRef = useRef<Float32Array | null>(null);
  const lastTickUi = useRef(0);
  const lastOverlay = useRef(0);
  const dragRef = useRef<DragState | null>(null);
  const onTimeTickRef = useRef(onTimeTick);
  const onRecordCompleteRef = useRef(onRecordComplete);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const [viewProgress, setViewProgress] = useState(0);
  const [guides, setGuides] = useState({ x: false, y: false });
  const [cursor, setCursor] = useState("default");

  useEffect(() => {
    timeRef.current = currentTime;
  }, [currentTime]);
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);
  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);
  useEffect(() => {
    motionModeRef.current = motionMode;
    if (motionMode === "auto") viewLiveRef.current = false;
  }, [motionMode]);
  useEffect(() => {
    axisRef.current = axis;
  }, [axis]);
  useEffect(() => {
    fpsRef.current = fps;
  }, [fps]);
  useEffect(() => {
    takeRef.current = take;
  }, [take]);
  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);
  useEffect(() => {
    easingRef.current = easing;
  }, [easing]);
  useEffect(() => {
    fitRef.current = fit;
  }, [fit]);
  useEffect(() => {
    showLineRef.current = showLine;
  }, [showLine]);
  useEffect(() => {
    beforeLabelRef.current = beforeLabel;
  }, [beforeLabel]);
  useEffect(() => {
    afterLabelRef.current = afterLabel;
  }, [afterLabel]);
  useEffect(() => {
    beforePlaceRef.current = beforePlacement;
  }, [beforePlacement]);
  useEffect(() => {
    afterPlaceRef.current = afterPlacement;
  }, [afterPlacement]);
  useEffect(() => {
    onTimeTickRef.current = onTimeTick;
  }, [onTimeTick]);
  useEffect(() => {
    onRecordCompleteRef.current = onRecordComplete;
  }, [onRecordComplete]);

  useEffect(() => {
    const blockDrag = (ev: DragEvent) => ev.preventDefault();
    window.addEventListener("dragstart", blockDrag, true);
    return () => {
      window.removeEventListener("dragstart", blockDrag, true);
      clearDragCursor();
    };
  }, []);

  useEffect(() => {
    recordingRef.current = recording;
    if (recording) {
      const arr = allocTake(durationRef.current, fpsRef.current, liveProgressRef.current);
      recordWorkingRef.current = arr;
      recordLastRef.current = 0;
      arr[0] = liveProgressRef.current;
      recordStartRef.current = performance.now();
      timeRef.current = 0;
      finishingRef.current = false;
      viewLiveRef.current = true;
    } else if (!finishingRef.current) {
      recordWorkingRef.current = null;
    } else {
      finishingRef.current = false;
    }
  }, [recording]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!canvas || !wrap || !stage) return;

    const progressNow = () => {
      if (motionModeRef.current === "auto") {
        return sliderAtTime(
          timeRef.current,
          secondsRef.current,
          EASINGS[easingRef.current],
        );
      }
      if (recordingRef.current || viewLiveRef.current || !takeRef.current) {
        return liveProgressRef.current;
      }
      return sampleRecorded(takeRef.current, timeRef.current, fpsRef.current);
    };

    const applyClip = (p: number) => {
      const el = clipRef.current;
      if (!el) return;
      if (axisRef.current === "vertical") {
        el.style.width = `${p * 100}%`;
        el.style.height = "100%";
      } else {
        el.style.width = "100%";
        el.style.height = `${p * 100}%`;
      }
    };

    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const maxW = Math.max(1, rect.width);
      const maxH = Math.min(Math.max(160, window.innerHeight * 0.72), 832);
      const scale = Math.min(maxW / outW, maxH / outH);
      const cssW = Math.max(1, Math.round(outW * scale));
      const cssH = Math.max(1, Math.round(outH * scale));
      stage.style.width = `${cssW}px`;
      stage.style.height = `${cssH}px`;
      const bufW = Math.round(cssW * dpr);
      const bufH = Math.round(cssH * dpr);
      if (canvas.width !== bufW) canvas.width = bufW;
      if (canvas.height !== bufH) canvas.height = bufH;
      setStageSize((prev) => (prev.w === cssW && prev.h === cssH ? prev : { w: cssW, h: cssH }));
      paint();
    };

    const paint = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!before?.element) {
        drawPlaceholder(ctx, t("preview.addBefore"));
        applyClip(0);
        return;
      }
      const progress = progressNow();
      progressRef.current = progress;
      drawFrame(ctx, {
        before: before.element,
        after: after?.element ?? null,
        progress,
        fit: fitRef.current,
        showLine: showLineRef.current,
        axis: axisRef.current,
        beforeLabel: beforeLabelRef.current,
        afterLabel: afterLabelRef.current,
        beforePlacement: beforePlaceRef.current,
        afterPlacement: afterPlaceRef.current,
      });
      applyClip(progress);
    };

    const loopFrame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (recordingRef.current) {
        const elapsed = (now - recordStartRef.current) / 1000;
        const dur = durationRef.current;
        const next = Math.min(dur, elapsed);
        timeRef.current = next;
        const arr = recordWorkingRef.current;
        const p = liveProgressRef.current;
        if (arr) {
          const i = Math.min(arr.length - 1, Math.floor(next * fpsRef.current));
          for (let k = recordLastRef.current + 1; k <= i; k++) arr[k] = p;
          arr[i] = p;
          recordLastRef.current = i;
        }
        if (elapsed >= dur) {
          recordingRef.current = false;
          finishingRef.current = true;
          if (arr) {
            for (let k = recordLastRef.current + 1; k < arr.length; k++) arr[k] = p;
            recordWorkingRef.current = null;
            takeRef.current = arr;
            viewLiveRef.current = false;
            playingRef.current = true;
            timeRef.current = 0;
            onRecordCompleteRef.current(arr);
          }
          onTimeTickRef.current(dur);
        } else if (now - lastTickUi.current > 50) {
          lastTickUi.current = now;
          onTimeTickRef.current(next);
          setViewProgress(progressRef.current);
        }
      } else if (playingRef.current && !exporting) {
        let next = timeRef.current + dt;
        const dur = durationRef.current;
        if (next >= dur) {
          if (loopRef.current) next = next % dur;
          else {
            next = dur;
            playingRef.current = false;
            onTimeTickRef.current(next);
          }
        }
        timeRef.current = next;
        if (now - lastTickUi.current > 80) {
          lastTickUi.current = now;
          onTimeTickRef.current(next);
        }
      }
      paint();
      if (now - lastOverlay.current > 50) {
        lastOverlay.current = now;
        setViewProgress(progressRef.current);
      }
      raf = requestAnimationFrame(loopFrame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    raf = requestAnimationFrame(loopFrame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [before, after, outW, outH, exporting, t]);

  const ratio = duration > 0 ? currentTime / duration : 0;
  const phase: PhaseId = phaseAtTime(currentTime, seconds);
  const manual = motionMode === "manual";
  const remaining = Math.max(0, duration - currentTime);

  const clientToProgress = (e: React.PointerEvent) => {
    const stage = stageRef.current;
    if (!stage) return 0;
    const rect = stage.getBoundingClientRect();
    if (axis === "vertical") {
      return clamp((e.clientX - rect.left) / rect.width, 0, 1);
    }
    return clamp((e.clientY - rect.top) / rect.height, 0, 1);
  };

  const localPoint = (e: React.PointerEvent) => {
    const stage = stageRef.current;
    if (!stage) return { x: 0, y: 0 };
    const rect = stage.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const slotAt = (x: number, y: number): SlotKey => {
    const { w, h } = stageSize;
    const vis = visibleRegion(w, h, progressRef.current, axis, "after");
    if (vis.w > 1 && vis.h > 1 && pointInRect(x, y, vis)) return "after";
    return "before";
  };

  const frame = (): ImageRect => ({ x: 0, y: 0, w: stageSize.w, h: stageSize.h });

  const visFor = (slot: SlotKey) => {
    const { w, h } = stageSize;
    const img = slot === "before" ? before : after;
    const place = slot === "before" ? beforePlaceRef.current : afterPlaceRef.current;
    const sz = sourceSize(img?.element ?? null);
    const rect = imageRect(sz.w, sz.h, w, h, fitRef.current, place);
    const region = visibleRegion(w, h, progressRef.current, axis, slot);
    return {
      rect,
      vis: intersect(rect, region),
      box: intersect(rect, frame()),
      sz,
    };
  };

  const hoverHit = (x: number, y: number) => {
    if (exporting) return "default";
    if (recording || (manual && nearSlider(x, y, stageSize.w, stageSize.h, progressRef.current, axis))) {
      return axis === "vertical" ? "ew-resize" : "ns-resize";
    }
    const sel = visFor(active);
    if (sel.box) {
      const handle = hitHandle(x, y, sel.box);
      if (handle) return handleCursor(handle);
    }
    const slot = slotAt(x, y);
    const img = slot === "before" ? before : after;
    if (!img) return "default";
    const { vis, box } = visFor(slot);
    if (box && pointInRect(x, y, box)) return "grab";
    if (vis && pointInRect(x, y, vis)) return "grab";
    return "default";
  };

  const applyPlace = (slot: SlotKey, next: ImagePlacement, snapX: boolean, snapY: boolean) => {
    if (slot === "before") {
      beforePlaceRef.current = next;
      onBeforePlacement(next);
    } else {
      afterPlaceRef.current = next;
      onAfterPlacement(next);
    }
    setGuides({ x: snapX, y: snapY });
  };

  const onHitPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (exporting) return;
    e.preventDefault();
    const { x, y } = localPoint(e);
    const { w, h } = stageSize;

    if (recording || (manual && nearSlider(x, y, w, h, progressRef.current, axis))) {
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = { kind: "slider" };
      viewLiveRef.current = true;
      onPause();
      liveProgressRef.current = clientToProgress(e);
      setGuides({ x: false, y: false });
      applyDragCursor(axis === "vertical" ? "ew-resize" : "ns-resize");
      return;
    }

    const sel = visFor(active);
    const selHandle = sel.box ? hitHandle(x, y, sel.box) : null;
    const slot = selHandle ? active : slotAt(x, y);
    const img = slot === "before" ? before : after;
    if (!img) return;
    onActive(slot);
    onPause();
    setViewProgress(progressRef.current);

    if (e.detail === 2) {
      applyPlace(slot, DEFAULT_PLACEMENT, true, true);
      dragRef.current = null;
      return;
    }

    const geo = visFor(slot);
    e.currentTarget.setPointerCapture(e.pointerId);

    const handle = selHandle && slot === active ? selHandle : geo.box ? hitHandle(x, y, geo.box) : null;
    if (handle && geo.box) {
      const base = baseSize(geo.sz.w, geo.sz.h, w, h, fit);
      dragRef.current = {
        kind: "resize",
        slot,
        handle,
        startRect: geo.rect,
        displayed: geo.box,
        x,
        y,
        baseW: base.w,
        baseH: base.h,
      };
      applyDragCursor(handleCursor(handle));
      return;
    }

    dragRef.current = {
      kind: "pan",
      slot,
      start: slot === "before" ? beforePlaceRef.current : afterPlaceRef.current,
      x,
      y,
    };
    applyDragCursor("grabbing");
  };

  const onHitPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { x, y } = localPoint(e);
    const drag = dragRef.current;
    if (!drag) {
      setCursor(hoverHit(x, y));
      return;
    }
    e.preventDefault();
    if (drag.kind === "slider") {
      liveProgressRef.current = clientToProgress(e);
      setViewProgress(progressRef.current);
      return;
    }
    const { w, h } = stageSize;
    if (drag.kind === "pan") {
      const next = panPlacement(drag.start, x - drag.x, y - drag.y, w, h);
      applyPlace(drag.slot, next.placement, next.snapX, next.snapY);
      applyDragCursor("grabbing");
      setCursor("grabbing");
      return;
    }
    const next = resizePlacement(
      drag.startRect,
      drag.displayed,
      drag.handle,
      x - drag.x,
      y - drag.y,
      w,
      h,
      drag.baseW,
      drag.baseH,
    );
    applyPlace(drag.slot, next.placement, next.snapX, next.snapY);
    applyDragCursor(handleCursor(drag.handle));
    setCursor(handleCursor(drag.handle));
  };

  const onHitPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
    setGuides({ x: false, y: false });
    clearDragCursor();
    const { x, y } = localPoint(e);
    setCursor(hoverHit(x, y));
  };

  const onBarPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    viewLiveRef.current = false;
    onSeek(x * duration);
  };

  const playDisabled = exporting || recording || (manual && !take);
  const labelsLocked = exporting || recording;
  const beforeVis = (() => {
    if (!before || stageSize.w <= 0) return null;
    const sz = sourceSize(before.element);
    const rect = imageRect(sz.w, sz.h, stageSize.w, stageSize.h, fit, beforePlacement);
    return intersect(rect, { x: 0, y: 0, w: stageSize.w, h: stageSize.h });
  })();
  const afterVis = (() => {
    if (!after || stageSize.w <= 0) return null;
    const sz = sourceSize(after.element);
    const rect = imageRect(sz.w, sz.h, stageSize.w, stageSize.h, fit, afterPlacement);
    return intersect(rect, { x: 0, y: 0, w: stageSize.w, h: stageSize.h });
  })();
  const selectedVis = active === "before" ? beforeVis : afterVis;

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-4 lg:sticky lg:top-4 lg:self-start">
      <div ref={wrapRef} className="flex w-full justify-center">
        <div
          ref={stageRef}
          data-testid="preview-stage"
          className="relative w-full overflow-hidden rounded-xl bg-surface outline outline-1 -outline-offset-1 outline-fg/10"
          style={{ aspectRatio: `${outW} / ${outH}` }}
        >
          <canvas
            ref={canvasRef}
            className="pointer-events-none block size-full"
            aria-label={t("preview.aria")}
          />

          <div
            className="absolute inset-0 touch-none select-none"
            style={{ cursor }}
            onPointerDown={onHitPointerDown}
            onPointerMove={onHitPointerMove}
            onPointerUp={onHitPointerUp}
            onPointerCancel={onHitPointerUp}
            onDragStart={(e) => e.preventDefault()}
          >
            {selectedVis && !exporting && !recording ? <BoxHandles vis={selectedVis} /> : null}
            {guides.x ? (
              <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-10 w-0.5 -translate-x-1/2 bg-paper outline outline-1 outline-bg" />
            ) : null}
            {guides.y ? (
              <div className="pointer-events-none absolute right-0 left-0 top-1/2 z-10 h-0.5 -translate-y-1/2 bg-paper outline outline-1 outline-bg" />
            ) : null}
          </div>

          <div className="pointer-events-none absolute inset-0">
            <LabelChip
              label={beforeLabel}
              frameW={stageSize.w}
              frameH={stageSize.h}
              onChange={onBeforeLabel}
              disabled={labelsLocked}
            />
            <div
              ref={clipRef}
              className="absolute top-0 left-0 overflow-hidden"
              style={
                axis === "vertical" ? { width: "0%", height: "100%" } : { width: "100%", height: "0%" }
              }
            >
              <div
                className="absolute top-0 left-0"
                style={{ width: stageSize.w, height: stageSize.h }}
              >
                <LabelChip
                  label={afterLabel}
                  frameW={stageSize.w}
                  frameH={stageSize.h}
                  onChange={onAfterLabel}
                  disabled={labelsLocked}
                />
              </div>
            </div>
          </div>

          {recording ? (
            <div className="pointer-events-none absolute top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-bg/80 px-3 py-1.5 text-xs font-medium text-fg">
              <span className="size-2 animate-pulse rounded-full bg-danger" />
              <span>
                {t("preview.recording")} · {t("preview.recordingLeft", { s: remaining.toFixed(1) })}
              </span>
            </div>
          ) : null}

          {manual && take && !recording && !exporting ? (
            <div className="pointer-events-none absolute top-3 right-3 z-10 rounded-full bg-bg/80 px-3 py-1 text-xs text-ok">
              {t("preview.takeReady")}
            </div>
          ) : null}

          {exporting ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-bg/70">
              <p className="font-display text-lg text-fg">{t("preview.encoding")}</p>
              <p className="text-sm tabular-nums text-muted">
                {Math.round(exportRatio * 100)}%
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <p className="text-center text-xs text-faint">{t("preview.dragImage")}</p>

      <div className="flex flex-col gap-3">
        <div
          className="relative h-8 cursor-pointer touch-none select-none"
          onPointerDown={(e) => {
            if (recording) return;
            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
            onBarPointer(e);
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1 && !recording) onBarPointer(e);
          }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-label={t("preview.playhead")}
        >
          <div className="absolute inset-x-0 top-2 flex h-4 overflow-hidden rounded-sm">
            {manual ? (
              <div className="h-full w-full bg-surface-2">
                <div
                  className="h-full bg-wave/80"
                  style={{ width: `${Math.min(100, Math.max(0, ratio * 100))}%` }}
                />
              </div>
            ) : (
              PHASE_ORDER.map((id) => {
                const w = (seconds[id] / duration) * 100;
                const kind = PHASE_META[id].kind;
                return (
                  <div
                    key={id}
                    title={t(phaseLabelKey(id, axis))}
                    className={cn(
                      "h-full",
                      kind === "move" ? "bg-wave/80" : "bg-surface-2",
                      id === phase && "brightness-125",
                    )}
                    style={{ width: `${Math.max(0, w)}%` }}
                  />
                );
              })
            )}
          </div>
          <div
            className="pointer-events-none absolute top-1 h-6 w-px bg-fg"
            style={{ left: `${Math.min(100, Math.max(0, ratio * 100))}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {manual ? (
            <Tooltip content={t("hint.record")}>
              <Button
                type="button"
                variant={recording ? "danger" : "secondary"}
                size="sm"
                data-testid="record-button"
                disabled={exporting || recording}
                onClick={onRecordStart}
              >
                <Circle className="size-3 fill-danger text-danger" />
                {take ? t("preview.rerecord") : t("preview.record")}
              </Button>
            </Tooltip>
          ) : null}
          <Tooltip content={t("hint.play")}>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              disabled={playDisabled}
              onClick={() => {
                if (manual && take) viewLiveRef.current = false;
                onTogglePlay();
              }}
              aria-label={playing ? t("preview.pause") : t("preview.play")}
            >
              {playing ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4 translate-x-px" />
              )}
            </Button>
          </Tooltip>
          <Tooltip content={t("hint.restart")}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={exporting || recording || (manual && !take)}
              onClick={() => {
                viewLiveRef.current = false;
                onRestart();
              }}
              aria-label={t("preview.restart")}
            >
              <RotateCcw className="size-4" />
            </Button>
          </Tooltip>
          <p className="min-w-28 font-mono text-sm tabular-nums text-muted">
            {formatTime(currentTime)}
            <span className="text-faint"> / {formatTime(duration)}</span>
          </p>
          {!manual ? (
            <p className="hidden text-xs text-faint sm:block">
              {t(phaseLabelKey(phase, axis))}
            </p>
          ) : (
            <p className="hidden text-xs text-faint sm:block">{t("preview.dragSlider")}</p>
          )}
          <Tooltip content={t("hint.loop")}>
            <label className="ml-auto flex items-center gap-2 text-sm text-muted">
              <Switch checked={loop} onCheckedChange={onLoopChange} />
              {t("preview.loop")}
            </label>
          </Tooltip>
        </div>
      </div>
    </section>
  );
}
