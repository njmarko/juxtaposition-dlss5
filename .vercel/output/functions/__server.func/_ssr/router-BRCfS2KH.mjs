import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BRCfS2KH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var en = {
	app: {
		name: "Juxtaposition DLSS5",
		tagline: "Before / after video studio"
	},
	header: {
		madeBy: "Made by",
		withGrok: "with Grok",
		xAria: "Marko Njegomir on X, @njmarko"
	},
	lang: {
		en: "English",
		sr: "Српски",
		switch: "Language"
	},
	drop: {
		before: "Drop as Before",
		after: "Drop as After"
	},
	images: {
		title: "Images",
		blurb: "Upload, drag and drop, or paste from the clipboard.",
		swap: "Swap",
		paste: "Paste",
		upload: "Upload",
		reset: "Reset",
		empty: "Drop, paste, or upload",
		none: "No image yet",
		pasteHint: "Selected slot receives pasted images. Drop two files at once to fill both.",
		before: "Before",
		after: "After",
		beforeTitle: "Image 1 · Before",
		afterTitle: "Image 2 · After",
		beforeHint: "Shown in full at the start",
		afterHint: "Revealed as the slider travels"
	},
	preview: {
		aria: "Comparison preview",
		encoding: "Encoding video",
		play: "Play",
		pause: "Pause",
		restart: "Restart",
		loop: "Loop",
		playhead: "Playhead",
		dragSlider: "Drag the handle to move the slider",
		dragImage: "Drag to move · edges stretch one side · corners scale both · double-click or Reset to restore",
		recording: "Recording",
		recordingLeft: "{s}s left — drag the slider",
		takeReady: "Take ready",
		record: "Record",
		rerecord: "Re-record",
		addBefore: "Add a before image to begin"
	},
	motion: {
		title: "Motion",
		blurbAuto: "Hold, sweep, hold, sweep back, hold. Easing on the sweeps only.",
		blurbManual: "You drive the slider with the mouse. Recording stops at the video length.",
		mode: "Motion",
		auto: "Automatic",
		manual: "Manual",
		axis: "Slider axis",
		vertical: "Vertical",
		horizontal: "Horizontal",
		units: "Timing units",
		seconds: "Seconds",
		percent: "Percent",
		length: "Video length",
		easing: "Sweep easing",
		presetShort: "Short 4s",
		presetDefault: "Default 8s",
		presetCinematic: "Cinematic 12s",
		presetSlow: "Slow 16s",
		percentSum: "Phases sum to {n}%.",
		percentOk: "Locked to the video length.",
		percentWeights: "Playback still uses them as weights of the video length.",
		eased: "eased"
	},
	phase: {
		waitStartV: "Hold left",
		moveOutV: "Sweep right",
		waitFarV: "Hold right",
		moveBackV: "Sweep left",
		waitHomeV: "Hold left",
		waitStartH: "Hold top",
		moveOutH: "Sweep down",
		waitFarH: "Hold bottom",
		moveBackH: "Sweep up",
		waitHomeH: "Hold top"
	},
	easing: {
		cinematic: "Cinematic",
		smooth: "Smooth",
		gentle: "Gentle",
		linear: "Linear"
	},
	export: {
		title: "Export",
		blurb: "Encoded in the browser. 4K at 60 fps can take a minute.",
		aspect: "Aspect ratio",
		res: "Resolution",
		width: "Width",
		height: "Height",
		fps: "Framerate",
		format: "Format",
		quality: "Quality",
		fit: "Image fit",
		showLine: "Show slider line in the video",
		button: "Export video",
		cancel: "Cancel",
		finalizing: "Writing file…",
		frame: "Frame {n} of {total}",
		needBefore: "Add a before image first.",
		needAfter: "Add an after image first.",
		needTake: "Record a take first — then export.",
		saved: "Saved {name}",
		cancelled: "Export cancelled.",
		failed: "Export failed.",
		fallback: "Saved as {ext} because {wanted} is not available in this browser.",
		fps30: "30 fps",
		fps60: "60 fps"
	},
	quality: {
		medium: "Draft",
		high: "High",
		"very-high": "Max"
	},
	fit: {
		cover: "Cover — fill the visible frame",
		contain: "Contain — fit inside the frame",
		stretch: "Stretch — fill exactly"
	},
	aspect: {
		source: "Match source",
		"16:9": "16:9 Widescreen",
		"9:16": "9:16 Vertical",
		"1:1": "1:1 Square",
		"4:3": "4:3 Classic",
		"3:2": "3:2 Photo",
		"2:3": "2:3 Portrait",
		"21:9": "21:9 Ultrawide",
		"4:5": "4:5 Social",
		"5:4": "5:4"
	},
	res: {
		"1080p": "1080p — FHD",
		"2k": "2K — QHD",
		"4k": "4K — UHD",
		source: "Source — Native pixels",
		custom: "Custom — Any size"
	},
	labels: {
		title: "DLSS 5 labels",
		blurb: "Sharp text badges, captured in the video. Drag them on the preview.",
		before: "Before label",
		after: "After label",
		enable: "Show label",
		kind: "Style",
		on: "DLSS 5 ON",
		off: "DLSS 5 OFF",
		size: "Size",
		drag: "Drag the badge on the preview to place it."
	},
	toast: {
		loadFail: "Could not load the demo images.",
		pasteHint: "Press Ctrl+V or Cmd+V to paste an image.",
		readFail: "Could not read that image."
	},
	hint: {
		lang: "Switch the interface language. English is the default.",
		swap: "Swap the before and after images.",
		paste: "Paste an image from the clipboard into the selected slot.",
		upload: "Choose an image file from your computer.",
		resetFrame: "Restore this image to the current fit, centered in the visible frame.",
		slotBefore: "Click to select. This slot is fully visible at the start of the wipe.",
		slotAfter: "Click to select. This slot is revealed as the slider moves.",
		place: "Click and drag an image to position it, including outside the frame. Drag a side to move that edge; drag a corner to scale both width and height.",
		motionMode: "Automatic plays a timed ease. Manual lets you drag the slider; a recording of that path becomes the video.",
		axis: "Vertical is a standing line that travels left to right. Horizontal is a lying line that travels top to bottom.",
		units: "Edit each phase in seconds, or as a percentage of the video length.",
		lengthAuto: "Total duration of the exported clip. In seconds mode, editing this scales every phase.",
		lengthManual: "How long the recording lasts. Capture stops automatically when this time is up.",
		lengthPercent: "Total duration stays fixed. Phase values are weights of this length.",
		easing: "How the automatic sweep accelerates and decelerates.",
		presetShort: "A tight 4 second cycle.",
		presetDefault: "An 8 second cycle.",
		presetCinematic: "A 12 second cycle with longer sweeps.",
		presetSlow: "A 16 second cycle.",
		waitStart: "Still frame at the start, showing image 1.",
		moveOut: "The slider travels across to reveal image 2. Eased.",
		waitFar: "Still frame fully on image 2.",
		moveBack: "The slider travels back to conceal image 2. Eased.",
		waitHome: "Still frame at the end, showing image 1 again.",
		play: "Play or pause the preview.",
		restart: "Jump to the start and play.",
		loop: "Repeat the clip in the preview.",
		playhead: "Drag to scrub through time.",
		record: "Record your mouse-driven slider for the video length. The pointer is not drawn in the file.",
		aspect: "Frame shape of the exported video.",
		res: "Output size. 4K uses the short edge of 2160 pixels.",
		width: "Custom width in pixels. Rounded to an even number for the encoder.",
		height: "Custom height in pixels. Rounded to an even number for the encoder.",
		fps: "Frames per second. 60 is smoother and a larger file.",
		format: "MP4 is the most compatible. WebM is a good fallback.",
		quality: "Encoder quality. Max is largest and sharpest.",
		fit: "Original size in the visible video frame. Cover fills and crops; contain fits inside; stretch fills exactly. Reset on each image returns to this.",
		showLine: "Draw the comparison handle in the exported video.",
		export: "Render and download the video. Encoding happens in this browser.",
		cancel: "Stop the current encode.",
		labelEnable: "Draw this badge on the image and in the exported video.",
		labelKind: "Green ON or gray OFF. Text stays sharp at any size.",
		labelSize: "Badge size relative to the frame. Drag the badge on the preview to place it.",
		cinematic: "Smootherstep — acceleration and deceleration with no end jerk.",
		smooth: "Cubic ease-in-out.",
		gentle: "Sine ease-in-out.",
		linear: "Constant speed — no easing.",
		qMedium: "Smaller file, faster encode.",
		qHigh: "Balanced quality and size.",
		qVeryHigh: "Largest file, best detail."
	}
};
/**
* Register a language here (and add a messages file that satisfies `Messages`).
* English is the source of truth for keys — TypeScript will fail the build
* if a locale is missing a string.
*/
var LOCALES = {
	en: {
		id: "en",
		native: "English",
		htmlLang: "en",
		messages: en
	},
	sr: {
		id: "sr",
		native: "Српски",
		htmlLang: "sr-Cyrl",
		messages: {
			app: {
				name: "Juxtaposition DLSS5",
				tagline: "Студио за видео пре/после"
			},
			header: {
				madeBy: "Направио",
				withGrok: "уз Grok",
				xAria: "Марко Његомир на X-у, @njmarko"
			},
			lang: {
				en: "English",
				sr: "Српски",
				switch: "Језик"
			},
			drop: {
				before: "Превучи као Пре",
				after: "Превучи као После"
			},
			images: {
				title: "Слике",
				blurb: "Отпремите, превуците или налепите са клипборда.",
				swap: "Замени",
				paste: "Налепи",
				upload: "Отпреми",
				reset: "Ресет",
				empty: "Превуците, налепите или отпремите",
				none: "Нема слике",
				pasteHint: "Изабрано поље прима налепљену слику. Две датотеке одједном попуњавају оба поља.",
				before: "Пре",
				after: "После",
				beforeTitle: "Слика 1 · Пре",
				afterTitle: "Слика 2 · После",
				beforeHint: "Видљива у потпуности на почетку",
				afterHint: "Открива се кретањем клизача"
			},
			preview: {
				aria: "Преглед поређења",
				encoding: "Кодирање видеа",
				play: "Пусти",
				pause: "Пауза",
				restart: "Испочетка",
				loop: "Понављај",
				playhead: "Позиција",
				dragSlider: "Превуците дршку да померите клизач",
				dragImage: "Превуците да померите · ивица мења једну страну · угао мења обе · двоклик или Ресет за повратак",
				recording: "Снимање",
				recordingLeft: "још {s}с — померајте клизач",
				takeReady: "Снимак је спреман",
				record: "Сними",
				rerecord: "Сними поново",
				addBefore: "Додајте слику „Пре“ да почнете"
			},
			motion: {
				title: "Кретање",
				blurbAuto: "Застанак, прелаз, застанак, повратак, застанак. Убрзање само на прелазима.",
				blurbManual: "Клизач водите мишем. Снимање стаје на задатом трајању.",
				mode: "Кретање",
				auto: "Аутоматски",
				manual: "Ручно",
				axis: "Оса клизача",
				vertical: "Усправни",
				horizontal: "Водоравни",
				units: "Јединице времена",
				seconds: "Секунде",
				percent: "Проценат",
				length: "Трајање видеа",
				easing: "Убрзање прелаза",
				presetShort: "Кратко 4с",
				presetDefault: "Подразумевано 8с",
				presetCinematic: "Филмско 12с",
				presetSlow: "Споро 16с",
				percentSum: "Фазе збирно {n}%.",
				percentOk: "Закључано на трајање видеа.",
				percentWeights: "Репродукција их и даље користи као тежине трајања.",
				eased: "убрзано"
			},
			phase: {
				waitStartV: "Застанак лево",
				moveOutV: "Прелаз надесно",
				waitFarV: "Застанак десно",
				moveBackV: "Прелаз налево",
				waitHomeV: "Застанак лево",
				waitStartH: "Застанак горе",
				moveOutH: "Прелаз наниже",
				waitFarH: "Застанак доле",
				moveBackH: "Прелаз нагоре",
				waitHomeH: "Застанак горе"
			},
			easing: {
				cinematic: "Филмско",
				smooth: "Меко",
				gentle: "Благо",
				linear: "Линеарно"
			},
			export: {
				title: "Извоз",
				blurb: "Кодира се у прегледачу. 4K на 60 кад/с може потрајати минут.",
				aspect: "Однос страна",
				res: "Резолуција",
				width: "Ширина",
				height: "Висина",
				fps: "Кадрова у секунди",
				format: "Формат",
				quality: "Квалитет",
				fit: "Уклапање слике",
				showLine: "Прикажи линију клизача на видеу",
				button: "Извези видео",
				cancel: "Откажи",
				finalizing: "Уписивање датотеке…",
				frame: "Кадар {n} од {total}",
				needBefore: "Прво додајте слику „Пре“.",
				needAfter: "Прво додајте слику „После“.",
				needTake: "Прво снимите пролаз — па извезите.",
				saved: "Сачувано {name}",
				cancelled: "Извоз је отказан.",
				failed: "Извоз није успео.",
				fallback: "Сачувано као {ext} јер {wanted} није доступан у овом прегледачу.",
				fps30: "30 кад/с",
				fps60: "60 кад/с"
			},
			quality: {
				medium: "Нацрт",
				high: "Висок",
				"very-high": "Макс"
			},
			fit: {
				cover: "Попуни — видљиви кадар",
				contain: "Уклопи — стане у кадар",
				stretch: "Растегни — тачно попуни"
			},
			aspect: {
				source: "Као извор",
				"16:9": "16:9 Широки екран",
				"9:16": "9:16 Усправно",
				"1:1": "1:1 Квадрат",
				"4:3": "4:3 Класично",
				"3:2": "3:2 Фото",
				"2:3": "2:3 Портрет",
				"21:9": "21:9 Ултрашироко",
				"4:5": "4:5 Друштвене мреже",
				"5:4": "5:4"
			},
			res: {
				"1080p": "1080p — FHD",
				"2k": "2K — QHD",
				"4k": "4K — UHD",
				source: "Извор — изворни пиксели",
				custom: "Прилагођено — било која величина"
			},
			labels: {
				title: "DLSS 5 ознаке",
				blurb: "Оштре текстуалне ознаке, улазе у видео. Превуците их на прегледу.",
				before: "Ознака Пре",
				after: "Ознака После",
				enable: "Прикажи ознаку",
				kind: "Стил",
				on: "DLSS 5 ON",
				off: "DLSS 5 OFF",
				size: "Величина",
				drag: "Превуците ознаку на прегледу да је поставите."
			},
			toast: {
				loadFail: "Демо слике нису учитане.",
				pasteHint: "Притисните Ctrl+V или Cmd+V да налепите слику.",
				readFail: "Слика није прочитана."
			},
			hint: {
				lang: "Промените језик сучеља. Енглески је подразумевани.",
				swap: "Замените слике пре и после.",
				paste: "Налепите слику из клипборда у изабрано поље.",
				upload: "Изаберите слику са рачунара.",
				resetFrame: "Вратите ову слику на текуће уклапање, центрирану у видљивом кадру.",
				slotBefore: "Кликните да изаберете. Ово поље је потпуно видљиво на почетку прелаза.",
				slotAfter: "Кликните да изаберете. Ово поље се открива кретањем клизача.",
				place: "Кликните и превуците слику да је поставите, укључујући ван кадра. Повуците страну да померите ту ивицу; угао мења ширину и висину.",
				motionMode: "Аутоматски пушта временски прелаз. Ручно: клизач водите мишем; снимак тог пута постаје видео.",
				axis: "Усправни је стојећа линија која иде слева надесно. Водоравни је лежећа линија која иде одозго надоле.",
				units: "Уређујте сваку фазу у секундама или као проценат трајања видеа.",
				lengthAuto: "Укупно трајање извоза. У режиму секунди, измена овог поља сразмерно мења све фазе.",
				lengthManual: "Колико траје снимање. Зауставља се само када истекне ово време.",
				lengthPercent: "Трајање остаје исто. Вредности фаза су тежине тог трајања.",
				easing: "Како се аутоматски прелаз убрзава и успорава.",
				presetShort: "Кратак циклус од 4 секунде.",
				presetDefault: "Циклус од 8 секунди.",
				presetCinematic: "Циклус од 12 секунди са дужим прелазима.",
				presetSlow: "Циклус од 16 секунди.",
				waitStart: "Мирни кадар на почетку, слика 1.",
				moveOut: "Клизач прелази преко кадра и открива слику 2. Убрзано.",
				waitFar: "Мирни кадар потпуно на слици 2.",
				moveBack: "Клизач се враћа и поново скрива слику 2. Убрзано.",
				waitHome: "Мирни кадар на крају, поново слика 1.",
				play: "Пустите или паузирајте преглед.",
				restart: "Скочите на почетак и пустите.",
				loop: "Понављајте клип у прегледу.",
				playhead: "Превуците да премотате време.",
				record: "Снимите клизач који водите мишем током трајања видеа. Показивач се не црта у датотеци.",
				aspect: "Облик кадра извезеног видеа.",
				res: "Величина излаза. 4K користи краћу ивицу од 2160 пиксела.",
				width: "Прилагођена ширина у пикселима. Заокружује се на паран број због кодера.",
				height: "Прилагођена висина у пикселима. Заокружује се на паран број због кодера.",
				fps: "Број кадрова у секунди. 60 је глађе и даје већу датотеку.",
				format: "MP4 је најкомпатибилнији. WebM је добра резерва.",
				quality: "Квалитет кодирања. Макс је највећи и најоштрији.",
				fit: "Изворна величина у видљивом кадру видеа. Попуни исеца; уклопи стаје унутра; растегни попуњава тачно. Ресет на свакој слици враћа на ово.",
				showLine: "Цртај дршку поређења у извезеном видеу.",
				export: "Израчунајте и преузмите видео. Кодирање је у овом прегледачу.",
				cancel: "Зауставите текуће кодирање.",
				labelEnable: "Цртај ову ознаку на слици и у извезеном видеу.",
				labelKind: "Зелено ON или сиво OFF. Текст остаје оштар при свакој величини.",
				labelSize: "Величина ознаке у односу на кадар. Превуците ознаку на прегледу да је поставите.",
				cinematic: "Smootherstep — убрзање и успорење без трзаја на крајевима.",
				smooth: "Кубно ease-in-out.",
				gentle: "Синусно ease-in-out.",
				linear: "Стална брзина — без убрзања.",
				qMedium: "Мања датотека, брже кодирање.",
				qHigh: "Уравнотежен квалитет и величина.",
				qVeryHigh: "Највећа датотека, највише детаља."
			}
		}
	}
};
var LOCALE_IDS = Object.keys(LOCALES);
function lookup(messages, path) {
	const parts = path.split(".");
	let cur = messages;
	for (const p of parts) {
		if (cur == null || typeof cur !== "object") return void 0;
		cur = cur[p];
	}
	return typeof cur === "string" ? cur : void 0;
}
function translate(locale, path, vars) {
	let text = lookup(LOCALES[locale]?.messages ?? en, path) ?? lookup(en, path) ?? path;
	if (vars) for (const [k, v] of Object.entries(vars)) text = text.replaceAll(`{${k}}`, String(v));
	return text;
}
var STORAGE_KEY = "juxtaposition-dlss5.locale";
var I18nContext = (0, import_react.createContext)(null);
function readStoredLocale() {
	if (typeof window === "undefined") return "en";
	const raw = window.localStorage.getItem(STORAGE_KEY);
	if (raw && raw in LOCALES) return raw;
	return "en";
}
function I18nProvider({ children }) {
	const [locale, setLocaleState] = (0, import_react.useState)("en");
	(0, import_react.useEffect)(() => {
		setLocaleState(readStoredLocale());
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = LOCALES[locale].htmlLang;
		try {
			window.localStorage.setItem(STORAGE_KEY, locale);
		} catch {}
	}, [locale]);
	const setLocale = (0, import_react.useCallback)((id) => {
		if (id in LOCALES) setLocaleState(id);
	}, []);
	const t = (0, import_react.useCallback)((path, vars) => translate(locale, path, vars), [locale]);
	const value = (0, import_react.useMemo)(() => ({
		locale,
		setLocale,
		t,
		locales: LOCALES,
		localeIds: LOCALE_IDS
	}), [
		locale,
		setLocale,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nContext.Provider, {
		value,
		children
	});
}
function useI18n() {
	const ctx = (0, import_react.useContext)(I18nContext);
	if (!ctx) throw new Error("useI18n must be used within I18nProvider");
	return ctx;
}
var styles_default = "/assets/styles-C5sXOPkv.css";
var APP_NAME = "Juxtaposition DLSS5";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Juxtaposition DLSS5 — before/after reveal videos with a smooth slider. Made by Marko Njegomir with Grok."
			},
			{
				name: "theme-color",
				content: "#0c0b0a"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Serif:ital,wght@0,500;0,600;1,500&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter = () => import("./routes-CPytHhev.mjs");
var rootRouteChildren = { IndexRoute: createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useI18n as n, router_exports as t };
