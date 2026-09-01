import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Pause, c as ClipboardPaste, i as Play, l as Circle, o as Image$1, r as RotateCcw, s as Download, t as Upload } from "../_libs/lucide-react.mjs";
import { n as useI18n } from "./router-BRCfS2KH.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { i as Slot } from "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { a as BufferTarget, i as CanvasSource, n as Mp4OutputFormat, o as Quality, r as WebMOutputFormat, t as Output } from "../_libs/mediabunny.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CPytHhev.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function roundTo(n, places) {
	const p = 10 ** places;
	return Math.round(n * p) / p;
}
function formatNum(n, places = 3) {
	const r = roundTo(n, places);
	if (Number.isInteger(r)) return String(r);
	return r.toFixed(places).replace(/0+$/, "").replace(/\.$/, "");
}
function even(n) {
	const r = Math.max(2, Math.round(n));
	return r % 2 === 0 ? r : r + 1;
}
function formatTime(seconds) {
	const s = Math.max(0, seconds);
	const m = Math.floor(s / 60);
	const rem = s - m * 60;
	const whole = Math.floor(rem);
	const frac = Math.floor((rem - whole) * 10);
	if (m > 0) return `${m}:${whole.toString().padStart(2, "0")}.${frac}`;
	return `${whole}.${frac}s`;
}
function formatBytes(bytes) {
	if (bytes < 1024) return `${Math.round(bytes)} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/40 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-paper text-paper-fg hover:bg-fg",
			secondary: "bg-surface-2 text-fg hover:bg-line-strong",
			outline: "border border-line-strong bg-transparent text-fg hover:bg-surface-2",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			default: "h-10 rounded-md px-4 text-sm",
			sm: "h-8 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-md px-5 text-sm",
			icon: "size-10 rounded-md",
			"icon-sm": "size-8 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function TooltipProvider({ children, delayDuration = 250 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		children
	});
}
function Tooltip({ content, children, side = "top" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root3, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		side,
		sideOffset: 6,
		className: cn("z-50 max-w-xs rounded-md border border-line bg-surface px-2.5 py-1.5", "text-xs leading-snug text-fg shadow-none", "animate-in fade-in-0 zoom-in-95"),
		children: content
	}) })] });
}
function Segmented({ value, onChange, options, className, size = "md", ariaLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex rounded-md bg-surface-2 p-1", className),
		role: "radiogroup",
		"aria-label": ariaLabel ?? options.map((o) => o.label).join(" or "),
		children: options.map((o) => {
			const on = value === o.id;
			const btn = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "radio",
				"aria-checked": on,
				"aria-label": o.label,
				"data-testid": o.testId,
				onClick: () => onChange(o.id),
				className: cn("inline-flex w-full items-center justify-center gap-1.5 rounded-sm font-medium transition-[background-color,color,transform] duration-150 ease-out", size === "sm" ? "h-8 px-2 text-xs" : "h-9 px-2.5 text-sm", on ? "bg-paper text-paper-fg" : "text-muted hover:text-fg"),
				children: [o.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: o.label
				})]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1",
				children: o.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					content: o.hint,
					children: btn
				}) : btn
			}, o.id);
		})
	});
}
function FlagShell({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 60 30",
		"aria-hidden": "true",
		className: cn("h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] outline outline-1 outline-fg/25", className),
		children
	});
}
/** Union Jack, simplified so it reads at 20×12. */
function FlagEN({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FlagShell, {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
			id: "flag-en-clip",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "60",
				height: "30"
			})
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			clipPath: "url(#flag-en-clip)",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "60",
					height: "30",
					fill: "#012169"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0 0l60 30M60 0L0 30",
					stroke: "#fff",
					strokeWidth: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0 0l60 30M60 0L0 30",
					stroke: "#C8102E",
					strokeWidth: "2.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M30 0v30M0 15h60",
					stroke: "#fff",
					strokeWidth: "10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M30 0v30M0 15h60",
					stroke: "#C8102E",
					strokeWidth: "6"
				})
			]
		})]
	});
}
/** Serbian tricolor, no coat of arms at this size. */
function FlagRS({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FlagShell, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "60",
				height: "10",
				fill: "#C6363C"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: "10",
				width: "60",
				height: "10",
				fill: "#0C4076"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: "20",
				width: "60",
				height: "10",
				fill: "#fff"
			})
		]
	});
}
function XLogo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className,
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
	});
}
var FLAGS = {
	en: FlagEN,
	sr: FlagRS
};
function Header() {
	const { t, locale, setLocale, localeIds, locales } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-screen-2xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					className: "group flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"aria-hidden": "true",
						className: "relative flex size-9 overflow-hidden rounded-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 left-0 w-1/2 bg-wave" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 right-0 w-1/2 bg-surface-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-badge-on" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-testid": "app-title",
							className: "font-display text-xl font-medium leading-tight tracking-tight text-fg sm:text-2xl",
							children: t("app.name")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs tracking-wide text-muted",
							children: t("app.tagline")
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-3 gap-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
							size: "sm",
							ariaLabel: t("lang.switch"),
							value: locale,
							onChange: setLocale,
							options: localeIds.map((id) => {
								const Flag = FLAGS[id];
								return {
									id,
									label: locales[id].native,
									hint: t("hint.lang"),
									testId: `locale-${id}`,
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {})
								};
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							t("header.madeBy"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://x.com/njmarko",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "font-medium text-fg underline decoration-line-strong underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:text-paper hover:decoration-paper",
								children: "Marko Njegomir"
							}),
							" ",
							t("header.withGrok")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://x.com/njmarko",
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": t("header.xAria"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XLogo, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "@njmarko" })]
						})
					})
				]
			})]
		})
	});
}
function SlotCard({ slot, image, active, canReset, onSelect, onFile, onReset }) {
	const { t } = useI18n();
	const inputRef = (0, import_react.useRef)(null);
	const title = slot === "before" ? t("images.beforeTitle") : t("images.afterTitle");
	const hint = slot === "before" ? t("images.beforeHint") : t("images.afterHint");
	const slotHint = slot === "before" ? t("hint.slotBefore") : t("hint.slotAfter");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "button",
		tabIndex: 0,
		onClick: onSelect,
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onSelect();
			}
		},
		className: cn("flex min-h-44 flex-col overflow-hidden rounded-lg border bg-surface transition-[border-color,box-shadow] duration-150", active ? "border-paper/70 ring-2 ring-paper/25" : "border-line hover:border-line-strong"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-photo bg-surface-2",
			children: [image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image.url,
				alt: title,
				draggable: false,
				className: "absolute inset-0 size-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, {
					className: "size-6",
					strokeWidth: 1.5
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs",
					children: t("images.empty")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-2 top-2 rounded-sm bg-bg/80 px-2 py-0.5 text-xs font-medium text-fg",
				children: slot === "before" ? t("images.before") : t("images.after")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					content: slotHint,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "cursor-help text-sm font-medium text-fg underline decoration-dotted decoration-faint underline-offset-4",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: hint
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-faint",
					children: image ? image.name : t("images.none")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					accept: "image/*",
					className: "sr-only",
					onChange: (e) => {
						const f = e.target.files?.[0];
						if (f) onFile(f);
						e.currentTarget.value = "";
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("hint.upload"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							className: "flex-1",
							onClick: (e) => {
								e.stopPropagation();
								onSelect();
								inputRef.current?.click();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), t("images.upload")]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("hint.resetFrame"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							disabled: !canReset,
							"aria-label": t("images.reset"),
							onClick: (e) => {
								e.stopPropagation();
								onSelect();
								onReset();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), t("images.reset")]
						})
					})]
				})
			]
		})]
	});
}
function ImageSlots({ before, after, active, beforeCanReset, afterCanReset, onActive, onFile, onPasteClick, onSwap, onReset }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-medium text-fg",
					children: t("images.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: t("images.blurb")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("hint.swap"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: onSwap,
							children: t("images.swap")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("hint.paste"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onPasteClick,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPaste, { className: "size-3.5" }), t("images.paste")]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotCard, {
					slot: "before",
					image: before,
					active: active === "before",
					canReset: beforeCanReset,
					onSelect: () => onActive("before"),
					onFile: (f) => onFile("before", f),
					onReset: () => onReset("before")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotCard, {
					slot: "after",
					image: after,
					active: active === "after",
					canReset: afterCanReset,
					onSelect: () => onActive("after"),
					onFile: (f) => onFile("after", f),
					onReset: () => onReset("after")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: t("images.pasteHint")
			})
		]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-line", "bg-surface-2 transition-[background-color] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/40", "data-[state=checked]:border-paper data-[state=checked]:bg-paper", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-4 rounded-full bg-muted", "translate-x-1 transition-transform duration-150 ease-out", "data-[state=checked]:translate-x-5 data-[state=checked]:bg-paper-fg") })
	});
}
var LABEL_ON = {
	enabled: true,
	kind: "on",
	x: .018,
	y: .018,
	size: .036
};
var LABEL_OFF = {
	enabled: true,
	kind: "off",
	x: .018,
	y: .018,
	size: .036
};
var LABEL_TEXT = {
	on: "DLSS 5 ON",
	off: "DLSS 5 OFF"
};
var LABEL_BG = {
	on: "#4caf26",
	off: "#8a8a8a"
};
var LABEL_FG = "#ffffff";
function clampLabel(label) {
	return {
		...label,
		x: Math.min(.92, Math.max(0, label.x)),
		y: Math.min(.92, Math.max(0, label.y)),
		size: Math.min(.12, Math.max(.016, label.size))
	};
}
function badgeMetrics(canvasH, size) {
	const fontSize = Math.max(10, size * canvasH);
	return {
		fontSize,
		padX: fontSize * .52,
		padY: fontSize * .34,
		tracking: fontSize * .04
	};
}
function measureBadge(ctx, kind, canvasH, size) {
	const { fontSize, padX, padY, tracking } = badgeMetrics(canvasH, size);
	const text = LABEL_TEXT[kind];
	ctx.font = `700 ${fontSize}px "Figtree", "Noto Sans", sans-serif`;
	return {
		width: ctx.measureText(text).width + tracking * Math.max(0, text.length - 1) + padX * 2,
		height: fontSize + padY * 2,
		fontSize,
		padX,
		padY,
		tracking,
		text
	};
}
function drawBadge(ctx, label, canvasW, canvasH) {
	if (!label.enabled) return;
	const m = measureBadge(ctx, label.kind, canvasH, label.size);
	const x = label.x * canvasW;
	const y = label.y * canvasH;
	ctx.save();
	ctx.fillStyle = LABEL_BG[label.kind];
	ctx.fillRect(x, y, m.width, m.height);
	ctx.fillStyle = LABEL_FG;
	ctx.font = `700 ${m.fontSize}px "Figtree", "Noto Sans", sans-serif`;
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";
	const cy = y + m.height / 2;
	let cx = x + m.padX;
	for (const ch of m.text) {
		ctx.fillText(ch, cx, cy);
		cx += ctx.measureText(ch).width + m.tracking;
	}
	ctx.restore();
}
function LabelChip({ label, frameW, frameH, onChange, disabled }) {
	const modeRef = (0, import_react.useRef)(null);
	const grabRef = (0, import_react.useRef)({
		x: 0,
		y: 0,
		size: 0,
		pointerY: 0
	});
	if (!label.enabled || frameW <= 0 || frameH <= 0) return null;
	const fontSize = Math.max(10, label.size * frameH);
	const padX = fontSize * .52;
	const padY = fontSize * .34;
	const tracking = fontSize * .04;
	const text = LABEL_TEXT[label.kind];
	const onPointerDown = (e, mode) => {
		if (disabled) return;
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.setPointerCapture(e.pointerId);
		modeRef.current = mode;
		grabRef.current = {
			x: e.clientX - e.currentTarget.getBoundingClientRect().left,
			y: e.clientY - e.currentTarget.getBoundingClientRect().top,
			size: label.size,
			pointerY: e.clientY
		};
	};
	const onPointerMove = (e) => {
		if (!modeRef.current) return;
		if (!e.currentTarget.hasPointerCapture(e.pointerId) && modeRef.current === "move") {}
		const origin = e.currentTarget.offsetParent?.getBoundingClientRect();
		if (modeRef.current === "resize") {
			const dy = e.clientY - grabRef.current.pointerY;
			onChange(clampLabel({
				...label,
				size: grabRef.current.size + dy / frameH
			}));
			return;
		}
		if (!origin) return;
		const x = (e.clientX - origin.left - grabRef.current.x) / frameW;
		const y = (e.clientY - origin.top - grabRef.current.y) / frameH;
		onChange(clampLabel({
			...label,
			x,
			y
		}));
	};
	const onPointerUp = (e) => {
		if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
		modeRef.current = null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "group",
		"aria-label": text,
		onPointerDown: (e) => onPointerDown(e, "move"),
		onPointerMove,
		onPointerUp,
		onPointerCancel: onPointerUp,
		className: cn("absolute select-none touch-none font-sans font-bold leading-none", disabled ? "cursor-default" : "cursor-grab active:cursor-grabbing", label.kind === "on" ? "bg-badge-on text-badge-fg" : "bg-badge-off text-badge-fg"),
		style: {
			left: `${label.x * 100}%`,
			top: `${label.y * 100}%`,
			fontSize,
			padding: `${padY}px ${padX}px`,
			letterSpacing: `${tracking}px`,
			pointerEvents: disabled ? "none" : "auto"
		},
		children: [text, disabled ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			onPointerDown: (e) => onPointerDown(e, "resize"),
			onPointerMove: (e) => {
				if (modeRef.current !== "resize") return;
				const dy = e.clientY - grabRef.current.pointerY;
				onChange(clampLabel({
					...label,
					size: grabRef.current.size + dy / frameH
				}));
			},
			onPointerUp,
			onPointerCancel: onPointerUp,
			className: "absolute -bottom-0.5 -right-0.5 size-3 cursor-nwse-resize rounded-xs bg-badge-fg/90"
		})]
	});
}
var DEFAULT_PLACEMENT = {
	ox: 0,
	oy: 0,
	scaleX: 1,
	scaleY: 1
};
var MIN_SCALE = .05;
var SNAP_THRESHOLD = .02;
function isDefaultPlacement(p) {
	return p.ox === 0 && p.oy === 0 && p.scaleX === 1 && p.scaleY === 1;
}
function sourceSize(img) {
	if (!img) return {
		w: 0,
		h: 0
	};
	if (img instanceof HTMLImageElement) return {
		w: img.naturalWidth,
		h: img.naturalHeight
	};
	if (img instanceof HTMLCanvasElement) return {
		w: img.width,
		h: img.height
	};
	if (typeof ImageBitmap !== "undefined" && img instanceof ImageBitmap) return {
		w: img.width,
		h: img.height
	};
	if (img instanceof HTMLVideoElement) return {
		w: img.videoWidth,
		h: img.videoHeight
	};
	if (typeof OffscreenCanvas !== "undefined" && img instanceof OffscreenCanvas) return {
		w: img.width,
		h: img.height
	};
	return {
		w: 0,
		h: 0
	};
}
function baseSize(iw, ih, fw, fh, fit) {
	if (iw <= 0 || ih <= 0 || fw <= 0 || fh <= 0) return {
		w: fw,
		h: fh
	};
	if (fit === "stretch") return {
		w: fw,
		h: fh
	};
	const s = fit === "cover" ? Math.max(fw / iw, fh / ih) : Math.min(fw / iw, fh / ih);
	return {
		w: iw * s,
		h: ih * s
	};
}
function imageRect(iw, ih, fw, fh, fit, p) {
	const base = baseSize(iw, ih, fw, fh, fit);
	const w = base.w * p.scaleX;
	const h = base.h * p.scaleY;
	return {
		x: (fw - w) / 2 + p.ox * fw,
		y: (fh - h) / 2 + p.oy * fh,
		w,
		h
	};
}
function placementFromRect(rect, fw, fh, baseW, baseH) {
	const scaleX = clamp(rect.w / (baseW || 1), MIN_SCALE, 12);
	const scaleY = clamp(rect.h / (baseH || 1), MIN_SCALE, 12);
	const w = baseW * scaleX;
	const h = baseH * scaleY;
	return {
		ox: (rect.x - (fw - w) / 2) / (fw || 1),
		oy: (rect.y - (fh - h) / 2) / (fh || 1),
		scaleX,
		scaleY
	};
}
function clampPlacement(p) {
	return {
		ox: p.ox,
		oy: p.oy,
		scaleX: clamp(p.scaleX, MIN_SCALE, 12),
		scaleY: clamp(p.scaleY, MIN_SCALE, 12)
	};
}
function snapPlacement(p) {
	const snapX = Math.abs(p.ox) <= SNAP_THRESHOLD;
	const snapY = Math.abs(p.oy) <= SNAP_THRESHOLD;
	return {
		placement: clampPlacement({
			...p,
			ox: snapX ? 0 : p.ox,
			oy: snapY ? 0 : p.oy
		}),
		snapX,
		snapY
	};
}
function intersect(a, b) {
	const x = Math.max(a.x, b.x);
	const y = Math.max(a.y, b.y);
	const r = Math.min(a.x + a.w, b.x + b.w);
	const btm = Math.min(a.y + a.h, b.y + b.h);
	const w = r - x;
	const h = btm - y;
	if (w <= 1 || h <= 1) return null;
	return {
		x,
		y,
		w,
		h
	};
}
function visibleRegion(fw, fh, progress, axis, slot) {
	const splitV = progress * fw;
	const splitH = progress * fh;
	if (axis === "vertical") {
		if (slot === "after") return {
			x: 0,
			y: 0,
			w: splitV,
			h: fh
		};
		return {
			x: splitV,
			y: 0,
			w: fw - splitV,
			h: fh
		};
	}
	if (slot === "after") return {
		x: 0,
		y: 0,
		w: fw,
		h: splitH
	};
	return {
		x: 0,
		y: splitH,
		w: fw,
		h: fh - splitH
	};
}
function panPlacement(start, dx, dy, fw, fh) {
	return snapPlacement({
		...start,
		ox: start.ox + dx / (fw || 1),
		oy: start.oy + dy / (fh || 1)
	});
}
function minSize(base) {
	return Math.max(8, base * MIN_SCALE);
}
function resizePlacement(startRect, displayed, handle, dx, dy, fw, fh, baseW, baseH) {
	const minW = minSize(baseW);
	const minH = minSize(baseH);
	const maxW = baseW * 12;
	const maxH = baseH * 12;
	const corner = handle.length === 2;
	const visW = Math.max(1, displayed.w);
	const visH = Math.max(1, displayed.h);
	let L = startRect.x;
	let T = startRect.y;
	let R = startRect.x + startRect.w;
	let B = startRect.y + startRect.h;
	if (corner) {
		const fx = handle.includes("e") ? (visW + dx) / visW : (visW - dx) / visW;
		const fy = handle.includes("s") ? (visH + dy) / visH : (visH - dy) / visH;
		const f = Math.abs(fx - 1) >= Math.abs(fy - 1) ? fx : fy;
		let newW = clamp(startRect.w * f, minW, maxW);
		let newH = clamp(startRect.h * f, minH, maxH);
		const aspect = startRect.w / (startRect.h || 1);
		if (Math.abs(fx - 1) >= Math.abs(fy - 1)) newH = newW / aspect;
		else newW = newH * aspect;
		newW = clamp(newW, minW, maxW);
		newH = newW / aspect;
		if (handle.includes("w")) L = R - newW;
		else R = L + newW;
		if (handle.includes("n")) T = B - newH;
		else B = T + newH;
	} else if (handle === "e" || handle === "w") {
		const fx = handle === "e" ? (visW + dx) / visW : (visW - dx) / visW;
		const newW = clamp(startRect.w * fx, minW, maxW);
		if (handle === "w") L = R - newW;
		else R = L + newW;
	} else {
		const fy = handle === "s" ? (visH + dy) / visH : (visH - dy) / visH;
		const newH = clamp(startRect.h * fy, minH, maxH);
		if (handle === "n") T = B - newH;
		else B = T + newH;
	}
	return snapPlacement(placementFromRect({
		x: L,
		y: T,
		w: R - L,
		h: B - T
	}, fw, fh, baseW, baseH));
}
function handleCursor(handle) {
	switch (handle) {
		case "n":
		case "s": return "ns-resize";
		case "e":
		case "w": return "ew-resize";
		case "ne":
		case "sw": return "nesw-resize";
		case "nw":
		case "se": return "nwse-resize";
	}
}
function hitHandle(px, py, vis, slop = 12) {
	const L = vis.x;
	const T = vis.y;
	const R = vis.x + vis.w;
	const B = vis.y + vis.h;
	const cx = L + vis.w / 2;
	const cy = T + vis.h / 2;
	const c = slop + 4;
	const near = (x, y) => Math.hypot(px - x, py - y) <= c;
	if (near(L, T)) return "nw";
	if (near(R, T)) return "ne";
	if (near(R, B)) return "se";
	if (near(L, B)) return "sw";
	const onV = py >= T - slop && py <= B + slop;
	const onH = px >= L - slop && px <= R + slop;
	if (onV && Math.abs(px - L) <= slop) return "w";
	if (onV && Math.abs(px - R) <= slop) return "e";
	if (onH && Math.abs(py - T) <= slop) return "n";
	if (onH && Math.abs(py - B) <= slop) return "s";
	if (near(cx, T)) return "n";
	if (near(cx, B)) return "s";
	if (near(R, cy)) return "e";
	if (near(L, cy)) return "w";
	return null;
}
function pointInRect(px, py, r) {
	return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}
function nearSlider(px, py, fw, fh, progress, axis, band = 16) {
	if (axis === "vertical") {
		const x = progress * fw;
		const cy = fh / 2;
		if (Math.hypot(px - x, py - cy) <= 22) return true;
		return Math.abs(px - x) <= band;
	}
	const y = progress * fh;
	const cx = fw / 2;
	if (Math.hypot(px - cx, py - y) <= 22) return true;
	return Math.abs(py - y) <= band;
}
function drawFitted(ctx, img, dx, dy, dw, dh, fit, placement = DEFAULT_PLACEMENT) {
	const { w: iw, h: ih } = sourceSize(img);
	if (iw <= 0 || ih <= 0 || dw <= 0 || dh <= 0) return;
	const r = imageRect(iw, ih, dw, dh, fit, placement);
	ctx.drawImage(img, dx + r.x, dy + r.y, r.w, r.h);
}
function lineWidthForHeight(h) {
	return Math.max(2, Math.round(h / 400));
}
function drawChevron(ctx, x, y, dir, size, axis) {
	const s = size;
	ctx.beginPath();
	if (axis === "vertical") {
		ctx.moveTo(x + dir * s * .15, y - s * .55);
		ctx.lineTo(x + dir * s * .7, y);
		ctx.lineTo(x + dir * s * .15, y + s * .55);
	} else {
		ctx.moveTo(x - s * .55, y + dir * s * .15);
		ctx.lineTo(x, y + dir * s * .7);
		ctx.lineTo(x + s * .55, y + dir * s * .15);
	}
	ctx.lineWidth = Math.max(1.5, s * .28);
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.stroke();
}
function drawSlider(ctx, pos, w, h, axis) {
	const lw = lineWidthForHeight(h);
	const r = Math.max(13, lw * 4.6);
	ctx.save();
	if (axis === "vertical") {
		const x = Math.min(w, Math.max(0, pos));
		const cy = h / 2;
		const glow = ctx.createLinearGradient(x - 28, 0, x + 28, 0);
		glow.addColorStop(0, "rgba(241, 236, 227, 0)");
		glow.addColorStop(.5, "rgba(241, 236, 227, 0.1)");
		glow.addColorStop(1, "rgba(241, 236, 227, 0)");
		ctx.fillStyle = glow;
		ctx.fillRect(x - 28, 0, 56, h);
		ctx.fillStyle = "rgba(12, 11, 10, 0.55)";
		ctx.fillRect(x - lw / 2 + 1, 0, lw + 1.5, h);
		ctx.fillStyle = "#f7f3ec";
		ctx.fillRect(x - lw / 2, 0, lw, h);
		for (const ky of [lw * 2.2, h - lw * 2.2]) {
			ctx.beginPath();
			ctx.arc(x, ky, Math.max(4, lw * 1.6), 0, Math.PI * 2);
			ctx.fillStyle = "#f7f3ec";
			ctx.fill();
		}
		ctx.beginPath();
		ctx.arc(x, cy, r, 0, Math.PI * 2);
		ctx.fillStyle = "#f7f3ec";
		ctx.fill();
		ctx.lineWidth = Math.max(1, lw * .55);
		ctx.strokeStyle = "rgba(12, 11, 10, 0.35)";
		ctx.stroke();
		ctx.strokeStyle = "#1a1814";
		drawChevron(ctx, x - r * .08, cy, -1, r * .42, "vertical");
		drawChevron(ctx, x + r * .08, cy, 1, r * .42, "vertical");
	} else {
		const y = Math.min(h, Math.max(0, pos));
		const cx = w / 2;
		const glow = ctx.createLinearGradient(0, y - 28, 0, y + 28);
		glow.addColorStop(0, "rgba(241, 236, 227, 0)");
		glow.addColorStop(.5, "rgba(241, 236, 227, 0.1)");
		glow.addColorStop(1, "rgba(241, 236, 227, 0)");
		ctx.fillStyle = glow;
		ctx.fillRect(0, y - 28, w, 56);
		ctx.fillStyle = "rgba(12, 11, 10, 0.55)";
		ctx.fillRect(0, y - lw / 2 + 1, w, lw + 1.5);
		ctx.fillStyle = "#f7f3ec";
		ctx.fillRect(0, y - lw / 2, w, lw);
		for (const kx of [lw * 2.2, w - lw * 2.2]) {
			ctx.beginPath();
			ctx.arc(kx, y, Math.max(4, lw * 1.6), 0, Math.PI * 2);
			ctx.fillStyle = "#f7f3ec";
			ctx.fill();
		}
		ctx.beginPath();
		ctx.arc(cx, y, r, 0, Math.PI * 2);
		ctx.fillStyle = "#f7f3ec";
		ctx.fill();
		ctx.lineWidth = Math.max(1, lw * .55);
		ctx.strokeStyle = "rgba(12, 11, 10, 0.35)";
		ctx.stroke();
		ctx.strokeStyle = "#1a1814";
		drawChevron(ctx, cx, y - r * .08, -1, r * .42, "horizontal");
		drawChevron(ctx, cx, y + r * .08, 1, r * .42, "horizontal");
	}
	ctx.restore();
}
function drawFrame(ctx, opts) {
	const { before, after, progress, fit, showLine, axis = "vertical", beforeLabel, afterLabel, beforePlacement = DEFAULT_PLACEMENT, afterPlacement = DEFAULT_PLACEMENT, letterbox = "#0c0b0a" } = opts;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	ctx.fillStyle = letterbox;
	ctx.fillRect(0, 0, w, h);
	if (before) drawFitted(ctx, before, 0, 0, w, h, fit, beforePlacement);
	if (beforeLabel) drawBadge(ctx, beforeLabel, w, h);
	const split = axis === "vertical" ? progress * w : progress * h;
	if (after && split > .5) {
		ctx.save();
		ctx.beginPath();
		if (axis === "vertical") ctx.rect(0, 0, split, h);
		else ctx.rect(0, 0, w, split);
		ctx.clip();
		ctx.fillStyle = letterbox;
		ctx.fillRect(0, 0, w, h);
		drawFitted(ctx, after, 0, 0, w, h, fit, afterPlacement);
		if (afterLabel) drawBadge(ctx, afterLabel, w, h);
		ctx.restore();
	}
	if (showLine) drawSlider(ctx, split, w, h, axis);
}
function drawPlaceholder(ctx, label) {
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
	ctx.fillStyle = "#161412";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#9a9488";
	ctx.font = `${Math.max(14, Math.round(h * .035))}px Figtree, "Noto Sans", sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(label, w / 2, h / 2);
}
function sampleRecorded(samples, time, fps) {
	if (samples.length === 0) return 0;
	const idx = Math.max(0, time * fps);
	const i0 = Math.min(samples.length - 1, Math.floor(idx));
	const i1 = Math.min(samples.length - 1, i0 + 1);
	const f = Math.min(1, Math.max(0, idx - i0));
	return samples[i0] * (1 - f) + samples[i1] * f;
}
function allocTake(duration, fps, fill = 0) {
	const n = Math.max(1, Math.round(duration * fps));
	const a = new Float32Array(n);
	a.fill(fill);
	return a;
}
var PHASE_ORDER = [
	"waitStart",
	"moveRight",
	"waitRight",
	"moveLeft",
	"waitEnd"
];
var PHASE_META = {
	waitStart: {
		label: "Hold left",
		short: "Hold L",
		kind: "hold"
	},
	moveRight: {
		label: "Sweep right",
		short: "→ Right",
		kind: "move"
	},
	waitRight: {
		label: "Hold right",
		short: "Hold R",
		kind: "hold"
	},
	moveLeft: {
		label: "Sweep left",
		short: "← Left",
		kind: "move"
	},
	waitEnd: {
		label: "Hold left",
		short: "Hold L",
		kind: "hold"
	}
};
var DEFAULT_SECONDS = {
	waitStart: 1,
	moveRight: 2.5,
	waitRight: 1,
	moveLeft: 2.5,
	waitEnd: 1
};
function sumPhases(phases) {
	return PHASE_ORDER.reduce((acc, id) => acc + Math.max(0, phases[id]), 0);
}
function scalePhases(phases, fromTotal, toTotal) {
	const f = toTotal / (fromTotal || 1);
	const next = { ...phases };
	for (const id of PHASE_ORDER) next[id] = roundTo(Math.max(0, phases[id] * f), 3);
	return next;
}
function toPercents(seconds) {
	const total = sumPhases(seconds) || 1;
	const next = { ...seconds };
	for (const id of PHASE_ORDER) next[id] = roundTo(seconds[id] / total * 100, 2);
	return next;
}
function toSeconds(percents, totalDuration) {
	const weight = sumPhases(percents) || 1;
	const next = { ...percents };
	for (const id of PHASE_ORDER) next[id] = roundTo(percents[id] / weight * totalDuration, 3);
	return next;
}
function resolveSeconds(phases, mode, totalDuration) {
	if (mode === "seconds") return phases;
	return toSeconds(phases, totalDuration);
}
function resolvedDuration(phases, mode, totalDuration) {
	if (mode === "seconds") return Math.max(.1, sumPhases(phases));
	return Math.max(.1, totalDuration);
}
/**
* smootherstep — first and second derivatives are 0 at the ends,
* so the slider eases in and out without a visible jerk.
*/
function easeCinematic(t) {
	const x = clamp(t, 0, 1);
	return x * x * x * (x * (x * 6 - 15) + 10);
}
function easeSmooth(t) {
	const x = clamp(t, 0, 1);
	return x < .5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}
function easeGentle(t) {
	return -(Math.cos(Math.PI * clamp(t, 0, 1)) - 1) / 2;
}
var EASINGS = {
	cinematic: easeCinematic,
	smooth: easeSmooth,
	gentle: easeGentle,
	linear: (t) => clamp(t, 0, 1)
};
/** Slider position 0 = fully image A (left), 1 = fully image B (right). */
function sliderAtTime(time, seconds, ease) {
	const t = Math.max(0, time);
	const a = Math.max(0, seconds.waitStart);
	const b = Math.max(0, seconds.moveRight);
	const c = Math.max(0, seconds.waitRight);
	const d = Math.max(0, seconds.moveLeft);
	const t1 = a;
	const t2 = t1 + b;
	const t3 = t2 + c;
	const t4 = t3 + d;
	if (t <= t1) return 0;
	if (t < t2) {
		if (b <= 1e-6) return 1;
		return ease((t - t1) / b);
	}
	if (t < t3) return 1;
	if (t < t4) {
		if (d <= 1e-6) return 0;
		return 1 - ease((t - t3) / d);
	}
	return 0;
}
function phaseAtTime(time, seconds) {
	const t = Math.max(0, time);
	const t1 = seconds.waitStart;
	const t2 = t1 + seconds.moveRight;
	const t3 = t2 + seconds.waitRight;
	const t4 = t3 + seconds.moveLeft;
	if (t < t1) return "waitStart";
	if (t < t2) return "moveRight";
	if (t < t3) return "waitRight";
	if (t < t4) return "moveLeft";
	return "waitEnd";
}
function phaseLabelKey$1(id, axis) {
	const v = axis === "vertical";
	switch (id) {
		case "waitStart": return v ? "phase.waitStartV" : "phase.waitStartH";
		case "moveRight": return v ? "phase.moveOutV" : "phase.moveOutH";
		case "waitRight": return v ? "phase.waitFarV" : "phase.waitFarH";
		case "moveLeft": return v ? "phase.moveBackV" : "phase.moveBackH";
		case "waitEnd": return v ? "phase.waitHomeV" : "phase.waitHomeH";
	}
}
function BoxHandles({ vis }) {
	if (vis.w < 12 || vis.h < 12) return null;
	const pts = [
		{
			id: "nw",
			x: vis.x,
			y: vis.y
		},
		{
			id: "n",
			x: vis.x + vis.w / 2,
			y: vis.y
		},
		{
			id: "ne",
			x: vis.x + vis.w,
			y: vis.y
		},
		{
			id: "e",
			x: vis.x + vis.w,
			y: vis.y + vis.h / 2
		},
		{
			id: "se",
			x: vis.x + vis.w,
			y: vis.y + vis.h
		},
		{
			id: "s",
			x: vis.x + vis.w / 2,
			y: vis.y + vis.h
		},
		{
			id: "sw",
			x: vis.x,
			y: vis.y + vis.h
		},
		{
			id: "w",
			x: vis.x,
			y: vis.y + vis.h / 2
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute border border-paper/80",
		style: {
			left: vis.x,
			top: vis.y,
			width: vis.w,
			height: vis.h
		}
	}), pts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-[1px] border border-paper-fg bg-paper",
		style: {
			left: p.x,
			top: p.y
		}
	}, p.id))] });
}
function applyDragCursor(c) {
	document.body.style.cursor = c;
	document.documentElement.style.cursor = c;
}
function clearDragCursor() {
	document.body.style.cursor = "";
	document.documentElement.style.cursor = "";
}
function PreviewStage({ before, after, seconds, duration, easing, fit, showLine, playing, loop, currentTime, outW, outH, exporting, exportRatio, motionMode, axis, fps, recording, take, beforeLabel, afterLabel, beforePlacement, afterPlacement, active, onTogglePlay, onPause, onSeek, onRestart, onLoopChange, onTimeTick, onRecordStart, onRecordComplete, onBeforeLabel, onAfterLabel, onBeforePlacement, onAfterPlacement, onActive }) {
	const { t } = useI18n();
	const wrapRef = (0, import_react.useRef)(null);
	const stageRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const clipRef = (0, import_react.useRef)(null);
	const timeRef = (0, import_react.useRef)(currentTime);
	const playingRef = (0, import_react.useRef)(playing);
	const loopRef = (0, import_react.useRef)(loop);
	const durationRef = (0, import_react.useRef)(duration);
	const motionModeRef = (0, import_react.useRef)(motionMode);
	const axisRef = (0, import_react.useRef)(axis);
	const fpsRef = (0, import_react.useRef)(fps);
	const recordingRef = (0, import_react.useRef)(recording);
	const takeRef = (0, import_react.useRef)(take);
	const liveProgressRef = (0, import_react.useRef)(0);
	const viewLiveRef = (0, import_react.useRef)(motionMode === "manual");
	const secondsRef = (0, import_react.useRef)(seconds);
	const easingRef = (0, import_react.useRef)(easing);
	const fitRef = (0, import_react.useRef)(fit);
	const showLineRef = (0, import_react.useRef)(showLine);
	const beforeLabelRef = (0, import_react.useRef)(beforeLabel);
	const afterLabelRef = (0, import_react.useRef)(afterLabel);
	const beforePlaceRef = (0, import_react.useRef)(beforePlacement);
	const afterPlaceRef = (0, import_react.useRef)(afterPlacement);
	const progressRef = (0, import_react.useRef)(0);
	const finishingRef = (0, import_react.useRef)(false);
	const recordStartRef = (0, import_react.useRef)(0);
	const recordLastRef = (0, import_react.useRef)(-1);
	const recordWorkingRef = (0, import_react.useRef)(null);
	const lastTickUi = (0, import_react.useRef)(0);
	const lastOverlay = (0, import_react.useRef)(0);
	const dragRef = (0, import_react.useRef)(null);
	const onTimeTickRef = (0, import_react.useRef)(onTimeTick);
	const onRecordCompleteRef = (0, import_react.useRef)(onRecordComplete);
	const [stageSize, setStageSize] = (0, import_react.useState)({
		w: 0,
		h: 0
	});
	const [viewProgress, setViewProgress] = (0, import_react.useState)(0);
	const [guides, setGuides] = (0, import_react.useState)({
		x: false,
		y: false
	});
	const [cursor, setCursor] = (0, import_react.useState)("default");
	(0, import_react.useEffect)(() => {
		timeRef.current = currentTime;
	}, [currentTime]);
	(0, import_react.useEffect)(() => {
		playingRef.current = playing;
	}, [playing]);
	(0, import_react.useEffect)(() => {
		loopRef.current = loop;
	}, [loop]);
	(0, import_react.useEffect)(() => {
		durationRef.current = duration;
	}, [duration]);
	(0, import_react.useEffect)(() => {
		motionModeRef.current = motionMode;
		if (motionMode === "auto") viewLiveRef.current = false;
	}, [motionMode]);
	(0, import_react.useEffect)(() => {
		axisRef.current = axis;
	}, [axis]);
	(0, import_react.useEffect)(() => {
		fpsRef.current = fps;
	}, [fps]);
	(0, import_react.useEffect)(() => {
		takeRef.current = take;
	}, [take]);
	(0, import_react.useEffect)(() => {
		secondsRef.current = seconds;
	}, [seconds]);
	(0, import_react.useEffect)(() => {
		easingRef.current = easing;
	}, [easing]);
	(0, import_react.useEffect)(() => {
		fitRef.current = fit;
	}, [fit]);
	(0, import_react.useEffect)(() => {
		showLineRef.current = showLine;
	}, [showLine]);
	(0, import_react.useEffect)(() => {
		beforeLabelRef.current = beforeLabel;
	}, [beforeLabel]);
	(0, import_react.useEffect)(() => {
		afterLabelRef.current = afterLabel;
	}, [afterLabel]);
	(0, import_react.useEffect)(() => {
		beforePlaceRef.current = beforePlacement;
	}, [beforePlacement]);
	(0, import_react.useEffect)(() => {
		afterPlaceRef.current = afterPlacement;
	}, [afterPlacement]);
	(0, import_react.useEffect)(() => {
		onTimeTickRef.current = onTimeTick;
	}, [onTimeTick]);
	(0, import_react.useEffect)(() => {
		onRecordCompleteRef.current = onRecordComplete;
	}, [onRecordComplete]);
	(0, import_react.useEffect)(() => {
		const blockDrag = (ev) => ev.preventDefault();
		window.addEventListener("dragstart", blockDrag, true);
		return () => {
			window.removeEventListener("dragstart", blockDrag, true);
			clearDragCursor();
		};
	}, []);
	(0, import_react.useEffect)(() => {
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
		} else if (!finishingRef.current) recordWorkingRef.current = null;
		else finishingRef.current = false;
	}, [recording]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		const stage = stageRef.current;
		if (!canvas || !wrap || !stage) return;
		const progressNow = () => {
			if (motionModeRef.current === "auto") return sliderAtTime(timeRef.current, secondsRef.current, EASINGS[easingRef.current]);
			if (recordingRef.current || viewLiveRef.current || !takeRef.current) return liveProgressRef.current;
			return sampleRecorded(takeRef.current, timeRef.current, fpsRef.current);
		};
		const applyClip = (p) => {
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
			const maxH = Math.min(Math.max(160, window.innerHeight * .72), 832);
			const scale = Math.min(maxW / outW, maxH / outH);
			const cssW = Math.max(1, Math.round(outW * scale));
			const cssH = Math.max(1, Math.round(outH * scale));
			stage.style.width = `${cssW}px`;
			stage.style.height = `${cssH}px`;
			const bufW = Math.round(cssW * dpr);
			const bufH = Math.round(cssH * dpr);
			if (canvas.width !== bufW) canvas.width = bufW;
			if (canvas.height !== bufH) canvas.height = bufH;
			setStageSize((prev) => prev.w === cssW && prev.h === cssH ? prev : {
				w: cssW,
				h: cssH
			});
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
				afterPlacement: afterPlaceRef.current
			});
			applyClip(progress);
		};
		const loopFrame = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			if (recordingRef.current) {
				const elapsed = (now - recordStartRef.current) / 1e3;
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
	}, [
		before,
		after,
		outW,
		outH,
		exporting,
		t
	]);
	const ratio = duration > 0 ? currentTime / duration : 0;
	const phase = phaseAtTime(currentTime, seconds);
	const manual = motionMode === "manual";
	const remaining = Math.max(0, duration - currentTime);
	const clientToProgress = (e) => {
		const stage = stageRef.current;
		if (!stage) return 0;
		const rect = stage.getBoundingClientRect();
		if (axis === "vertical") return clamp((e.clientX - rect.left) / rect.width, 0, 1);
		return clamp((e.clientY - rect.top) / rect.height, 0, 1);
	};
	const localPoint = (e) => {
		const stage = stageRef.current;
		if (!stage) return {
			x: 0,
			y: 0
		};
		const rect = stage.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	};
	const slotAt = (x, y) => {
		const { w, h } = stageSize;
		const vis = visibleRegion(w, h, progressRef.current, axis, "after");
		if (vis.w > 1 && vis.h > 1 && pointInRect(x, y, vis)) return "after";
		return "before";
	};
	const frame = () => ({
		x: 0,
		y: 0,
		w: stageSize.w,
		h: stageSize.h
	});
	const visFor = (slot) => {
		const { w, h } = stageSize;
		const img = slot === "before" ? before : after;
		const place = slot === "before" ? beforePlaceRef.current : afterPlaceRef.current;
		const sz = sourceSize(img?.element ?? null);
		const rect = imageRect(sz.w, sz.h, w, h, fitRef.current, place);
		return {
			rect,
			vis: intersect(rect, visibleRegion(w, h, progressRef.current, axis, slot)),
			box: intersect(rect, frame()),
			sz
		};
	};
	const hoverHit = (x, y) => {
		if (exporting) return "default";
		if (recording || manual && nearSlider(x, y, stageSize.w, stageSize.h, progressRef.current, axis)) return axis === "vertical" ? "ew-resize" : "ns-resize";
		const sel = visFor(active);
		if (sel.box) {
			const handle = hitHandle(x, y, sel.box);
			if (handle) return handleCursor(handle);
		}
		const slot = slotAt(x, y);
		if (!(slot === "before" ? before : after)) return "default";
		const { vis, box } = visFor(slot);
		if (box && pointInRect(x, y, box)) return "grab";
		if (vis && pointInRect(x, y, vis)) return "grab";
		return "default";
	};
	const applyPlace = (slot, next, snapX, snapY) => {
		if (slot === "before") {
			beforePlaceRef.current = next;
			onBeforePlacement(next);
		} else {
			afterPlaceRef.current = next;
			onAfterPlacement(next);
		}
		setGuides({
			x: snapX,
			y: snapY
		});
	};
	const onHitPointerDown = (e) => {
		if (exporting) return;
		e.preventDefault();
		const { x, y } = localPoint(e);
		const { w, h } = stageSize;
		if (recording || manual && nearSlider(x, y, w, h, progressRef.current, axis)) {
			e.currentTarget.setPointerCapture(e.pointerId);
			dragRef.current = { kind: "slider" };
			viewLiveRef.current = true;
			onPause();
			liveProgressRef.current = clientToProgress(e);
			setGuides({
				x: false,
				y: false
			});
			applyDragCursor(axis === "vertical" ? "ew-resize" : "ns-resize");
			return;
		}
		const sel = visFor(active);
		const selHandle = sel.box ? hitHandle(x, y, sel.box) : null;
		const slot = selHandle ? active : slotAt(x, y);
		if (!(slot === "before" ? before : after)) return;
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
				baseH: base.h
			};
			applyDragCursor(handleCursor(handle));
			return;
		}
		dragRef.current = {
			kind: "pan",
			slot,
			start: slot === "before" ? beforePlaceRef.current : afterPlaceRef.current,
			x,
			y
		};
		applyDragCursor("grabbing");
	};
	const onHitPointerMove = (e) => {
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
		const next = resizePlacement(drag.startRect, drag.displayed, drag.handle, x - drag.x, y - drag.y, w, h, drag.baseW, drag.baseH);
		applyPlace(drag.slot, next.placement, next.snapX, next.snapY);
		applyDragCursor(handleCursor(drag.handle));
		setCursor(handleCursor(drag.handle));
	};
	const onHitPointerUp = (e) => {
		if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
		dragRef.current = null;
		setGuides({
			x: false,
			y: false
		});
		clearDragCursor();
		const { x, y } = localPoint(e);
		setCursor(hoverHit(x, y));
	};
	const onBarPointer = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
		viewLiveRef.current = false;
		onSeek(x * duration);
	};
	const playDisabled = exporting || recording || manual && !take;
	const labelsLocked = exporting || recording;
	const beforeVis = (() => {
		if (!before || stageSize.w <= 0) return null;
		const sz = sourceSize(before.element);
		return intersect(imageRect(sz.w, sz.h, stageSize.w, stageSize.h, fit, beforePlacement), {
			x: 0,
			y: 0,
			w: stageSize.w,
			h: stageSize.h
		});
	})();
	const afterVis = (() => {
		if (!after || stageSize.w <= 0) return null;
		const sz = sourceSize(after.element);
		return intersect(imageRect(sz.w, sz.h, stageSize.w, stageSize.h, fit, afterPlacement), {
			x: 0,
			y: 0,
			w: stageSize.w,
			h: stageSize.h
		});
	})();
	const selectedVis = active === "before" ? beforeVis : afterVis;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-w-0 flex-1 flex-col gap-4 lg:sticky lg:top-4 lg:self-start",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: wrapRef,
				className: "flex w-full justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: stageRef,
					"data-testid": "preview-stage",
					className: "relative w-full overflow-hidden rounded-xl bg-surface outline outline-1 -outline-offset-1 outline-fg/10",
					style: { aspectRatio: `${outW} / ${outH}` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: canvasRef,
							className: "pointer-events-none block size-full",
							"aria-label": t("preview.aria")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 touch-none select-none",
							style: { cursor },
							onPointerDown: onHitPointerDown,
							onPointerMove: onHitPointerMove,
							onPointerUp: onHitPointerUp,
							onPointerCancel: onHitPointerUp,
							onDragStart: (e) => e.preventDefault(),
							children: [
								selectedVis && !exporting && !recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxHandles, { vis: selectedVis }) : null,
								guides.x ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute top-0 bottom-0 left-1/2 z-10 w-0.5 -translate-x-1/2 bg-paper outline outline-1 outline-bg" }) : null,
								guides.y ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute right-0 left-0 top-1/2 z-10 h-0.5 -translate-y-1/2 bg-paper outline outline-1 outline-bg" }) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none absolute inset-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelChip, {
								label: beforeLabel,
								frameW: stageSize.w,
								frameH: stageSize.h,
								onChange: onBeforeLabel,
								disabled: labelsLocked
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								ref: clipRef,
								className: "absolute top-0 left-0 overflow-hidden",
								style: axis === "vertical" ? {
									width: "0%",
									height: "100%"
								} : {
									width: "100%",
									height: "0%"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-0 left-0",
									style: {
										width: stageSize.w,
										height: stageSize.h
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelChip, {
										label: afterLabel,
										frameW: stageSize.w,
										frameH: stageSize.h,
										onChange: onAfterLabel,
										disabled: labelsLocked
									})
								})
							})]
						}),
						recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none absolute top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-bg/80 px-3 py-1.5 text-xs font-medium text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 animate-pulse rounded-full bg-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("preview.recording"),
								" · ",
								t("preview.recordingLeft", { s: remaining.toFixed(1) })
							] })]
						}) : null,
						manual && take && !recording && !exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute top-3 right-3 z-10 rounded-full bg-bg/80 px-3 py-1 text-xs text-ok",
							children: t("preview.takeReady")
						}) : null,
						exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-bg/70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg text-fg",
								children: t("preview.encoding")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm tabular-nums text-muted",
								children: [Math.round(exportRatio * 100), "%"]
							})]
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-faint",
				children: t("preview.dragImage")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-8 cursor-pointer touch-none select-none",
					onPointerDown: (e) => {
						if (recording) return;
						e.currentTarget.setPointerCapture(e.pointerId);
						onBarPointer(e);
					},
					onPointerMove: (e) => {
						if (e.buttons === 1 && !recording) onBarPointer(e);
					},
					role: "slider",
					"aria-valuemin": 0,
					"aria-valuemax": duration,
					"aria-valuenow": currentTime,
					"aria-label": t("preview.playhead"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-0 top-2 flex h-4 overflow-hidden rounded-sm",
						children: manual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full w-full bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-wave/80",
								style: { width: `${Math.min(100, Math.max(0, ratio * 100))}%` }
							})
						}) : PHASE_ORDER.map((id) => {
							const w = seconds[id] / duration * 100;
							const kind = PHASE_META[id].kind;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								title: t(phaseLabelKey$1(id, axis)),
								className: cn("h-full", kind === "move" ? "bg-wave/80" : "bg-surface-2", id === phase && "brightness-125"),
								style: { width: `${Math.max(0, w)}%` }
							}, id);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute top-1 h-6 w-px bg-fg",
						style: { left: `${Math.min(100, Math.max(0, ratio * 100))}%` }
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						manual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("hint.record"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: recording ? "danger" : "secondary",
								size: "sm",
								"data-testid": "record-button",
								disabled: exporting || recording,
								onClick: onRecordStart,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-3 fill-danger text-danger" }), take ? t("preview.rerecord") : t("preview.record")]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("hint.play"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								size: "icon",
								disabled: playDisabled,
								onClick: () => {
									if (manual && take) viewLiveRef.current = false;
									onTogglePlay();
								},
								"aria-label": playing ? t("preview.pause") : t("preview.play"),
								children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 translate-x-px" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("hint.restart"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								disabled: exporting || recording || manual && !take,
								onClick: () => {
									viewLiveRef.current = false;
									onRestart();
								},
								"aria-label": t("preview.restart"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "min-w-28 font-mono text-sm tabular-nums text-muted",
							children: [formatTime(currentTime), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-faint",
								children: [" / ", formatTime(duration)]
							})]
						}),
						!manual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-xs text-faint sm:block",
							children: t(phaseLabelKey$1(phase, axis))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-xs text-faint sm:block",
							children: t("preview.dragSlider")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("hint.loop"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ml-auto flex items-center gap-2 text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: loop,
									onCheckedChange: onLoopChange
								}), t("preview.loop")]
							})
						})
					]
				})]
			})
		]
	});
}
function Field({ label, hint, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-1.5", className),
		children: [hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			content: hint,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-fit cursor-help text-xs font-medium tracking-wide text-muted underline decoration-dotted decoration-faint underline-offset-4",
				children: label
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-fit text-xs font-medium tracking-wide text-muted",
			children: label
		}), children]
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-10 w-full rounded-sm border border-line bg-surface-2 px-3 text-sm text-fg tabular-nums", "placeholder:text-faint", "transition-[border-color,box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/35", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
function NativeSelect({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("flex h-10 w-full rounded-sm border border-line bg-surface-2 px-3 text-sm text-fg", "transition-[border-color,box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/35", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props,
		children
	});
}
function Separator({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-px w-full bg-line", className),
		role: "separator"
	});
}
var TIMING_PRESETS = [
	{
		id: "short",
		seconds: {
			waitStart: .4,
			moveRight: 1.2,
			waitRight: .8,
			moveLeft: 1.2,
			waitEnd: .4
		}
	},
	{
		id: "default",
		seconds: DEFAULT_SECONDS
	},
	{
		id: "cinematic",
		seconds: {
			waitStart: 1.5,
			moveRight: 4,
			waitRight: 2,
			moveLeft: 3.5,
			waitEnd: 1
		}
	},
	{
		id: "slow",
		seconds: {
			waitStart: 2,
			moveRight: 5,
			waitRight: 2.5,
			moveLeft: 5,
			waitEnd: 1.5
		}
	}
];
var PRESET_HINT = {
	short: "hint.presetShort",
	default: "hint.presetDefault",
	cinematic: "hint.presetCinematic",
	slow: "hint.presetSlow"
};
var PRESET_LABEL = {
	short: "motion.presetShort",
	default: "motion.presetDefault",
	cinematic: "motion.presetCinematic",
	slow: "motion.presetSlow"
};
var PHASE_HINT = {
	waitStart: "hint.waitStart",
	moveRight: "hint.moveOut",
	waitRight: "hint.waitFar",
	moveLeft: "hint.moveBack",
	waitEnd: "hint.waitHome"
};
function phaseLabelKey(id, axis) {
	const v = axis === "vertical";
	switch (id) {
		case "waitStart": return v ? "phase.waitStartV" : "phase.waitStartH";
		case "moveRight": return v ? "phase.moveOutV" : "phase.moveOutH";
		case "waitRight": return v ? "phase.waitFarV" : "phase.waitFarH";
		case "moveLeft": return v ? "phase.moveBackV" : "phase.moveBackH";
		case "waitEnd": return v ? "phase.waitHomeV" : "phase.waitHomeH";
	}
}
function TimelinePanel({ motionMode, axis, mode, phases, totalDuration, easing, duration, onMotionMode, onAxis, onMode, onPhases, onTotal, onEasing }) {
	const { t } = useI18n();
	const sum = sumPhases(phases);
	const unit = mode === "seconds" ? "s" : "%";
	const auto = motionMode === "auto";
	const setPhase = (id, raw) => {
		const n = Math.max(0, Number.parseFloat(raw) || 0);
		onPhases({
			...phases,
			[id]: n
		});
	};
	const setLength = (raw) => {
		const n = Math.max(.1, Number.parseFloat(raw) || .1);
		if (auto && mode === "seconds") {
			onPhases(scalePhases(phases, sum || 1, n));
			onTotal(roundTo(n, 3));
		} else onTotal(roundTo(n, 3));
	};
	const lengthHint = !auto ? t("hint.lengthManual") : mode === "seconds" ? t("hint.lengthAuto") : t("hint.lengthPercent");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-medium text-fg",
				children: t("motion.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: auto ? t("motion.blurbAuto") : t("motion.blurbManual")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("motion.mode"),
				hint: t("hint.motionMode"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					value: motionMode,
					onChange: onMotionMode,
					ariaLabel: t("motion.mode"),
					options: [{
						id: "auto",
						label: t("motion.auto"),
						hint: t("hint.motionMode"),
						testId: "motion-auto"
					}, {
						id: "manual",
						label: t("motion.manual"),
						hint: t("hint.motionMode"),
						testId: "motion-manual"
					}]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("motion.axis"),
				hint: t("hint.axis"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					value: axis,
					onChange: onAxis,
					ariaLabel: t("motion.axis"),
					options: [{
						id: "vertical",
						label: t("motion.vertical"),
						hint: t("hint.axis"),
						testId: "axis-vertical"
					}, {
						id: "horizontal",
						label: t("motion.horizontal"),
						hint: t("hint.axis"),
						testId: "axis-horizontal"
					}]
				})
			}),
			auto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("motion.units"),
				hint: t("hint.units"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					value: mode,
					onChange: onMode,
					ariaLabel: t("motion.units"),
					options: [{
						id: "seconds",
						label: t("motion.seconds"),
						hint: t("hint.units")
					}, {
						id: "percent",
						label: t("motion.percent"),
						hint: t("hint.units")
					}]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("motion.length"),
				hint: lengthHint,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: .1,
						step: .1,
						inputMode: "decimal",
						"aria-label": t("motion.length"),
						value: Number.isFinite(duration) ? roundTo(duration, 3) : 0,
						onChange: (e) => setLength(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-faint",
						children: "s"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: TIMING_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					content: t(PRESET_HINT[p.id]),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => {
							onTotal(sumPhases(p.seconds));
							if (auto) {
								onMode("seconds");
								onPhases(p.seconds);
							}
						},
						children: t(PRESET_LABEL[p.id])
					})
				}, p.id))
			}),
			auto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
					children: PHASE_ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: `${t(phaseLabelKey(id, axis))}${PHASE_META[id].kind === "move" ? ` · ${t("motion.eased")}` : ""}`,
						hint: t(PHASE_HINT[id]),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								step: mode === "percent" ? 1 : .1,
								inputMode: "decimal",
								"aria-label": t(phaseLabelKey(id, axis)),
								value: formatNum(phases[id]),
								onChange: (e) => setPhase(id, e.target.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-faint",
								children: unit
							})]
						})
					}, id))
				}),
				mode === "percent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: sum === 100 ? "text-xs text-ok" : "text-xs text-muted",
					children: [
						t("motion.percentSum", { n: roundTo(sum, 2) }),
						" ",
						sum === 100 ? t("motion.percentOk") : t("motion.percentWeights")
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("motion.easing"),
					hint: t("hint.easing"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: easing,
						"aria-label": t("motion.easing"),
						onChange: (e) => onEasing(e.target.value),
						children: [
							"cinematic",
							"smooth",
							"gentle",
							"linear"
						].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: id,
							title: t(`hint.${id}`),
							children: t(`easing.${id}`)
						}, id))
					})
				})
			] }) : null
		]
	});
}
function Progress({ value, className }) {
	const pct = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className),
		role: "progressbar",
		"aria-valuenow": Math.round(pct),
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-paper transition-[width] duration-150 ease-out",
			style: { width: `${pct}%` }
		})
	});
}
var ASPECTS = [
	{
		id: "source",
		label: "Match source",
		ratio: null
	},
	{
		id: "16:9",
		label: "16:9 Widescreen",
		ratio: 16 / 9
	},
	{
		id: "9:16",
		label: "9:16 Vertical",
		ratio: 9 / 16
	},
	{
		id: "1:1",
		label: "1:1 Square",
		ratio: 1
	},
	{
		id: "4:3",
		label: "4:3 Classic",
		ratio: 4 / 3
	},
	{
		id: "3:2",
		label: "3:2 Photo",
		ratio: 3 / 2
	},
	{
		id: "2:3",
		label: "2:3 Portrait",
		ratio: 2 / 3
	},
	{
		id: "21:9",
		label: "21:9 Ultrawide",
		ratio: 21 / 9
	},
	{
		id: "4:5",
		label: "4:5 Social",
		ratio: 4 / 5
	},
	{
		id: "5:4",
		label: "5:4",
		ratio: 5 / 4
	}
];
var RESOLUTIONS = [
	{
		id: "1080p",
		label: "1080p",
		hint: "FHD",
		shortEdge: 1080
	},
	{
		id: "2k",
		label: "2K",
		hint: "QHD",
		shortEdge: 1440
	},
	{
		id: "4k",
		label: "4K",
		hint: "UHD",
		shortEdge: 2160
	},
	{
		id: "source",
		label: "Source",
		hint: "Native pixels",
		shortEdge: 0
	},
	{
		id: "custom",
		label: "Custom",
		hint: "Any size",
		shortEdge: 0
	}
];
function aspectRatio(id, sourceW, sourceH) {
	const found = ASPECTS.find((a) => a.id === id);
	if (found?.ratio) return found.ratio;
	if (sourceW > 0 && sourceH > 0) return sourceW / sourceH;
	return 1;
}
function computeOutputSize(opts) {
	const { aspect, res, customW, customH, sourceW, sourceH } = opts;
	if (res === "custom") return {
		width: even(customW || 1920),
		height: even(customH || 1080)
	};
	if (res === "source") {
		const w = sourceW || 1920;
		const h = sourceH || 1080;
		if (aspect === "source") return {
			width: even(w),
			height: even(h)
		};
		const ratio = aspectRatio(aspect, w, h);
		const srcLong = Math.max(w, h);
		if (ratio >= 1) return {
			width: even(srcLong),
			height: even(srcLong / ratio)
		};
		return {
			width: even(srcLong * ratio),
			height: even(srcLong)
		};
	}
	const short = RESOLUTIONS.find((r) => r.id === res)?.shortEdge ?? 1080;
	const ratio = aspectRatio(aspect, sourceW, sourceH);
	if (ratio >= 1) {
		const height = short;
		return {
			width: even(height * ratio),
			height: even(height)
		};
	}
	const width = short;
	const height = even(width / ratio);
	return {
		width: even(width),
		height
	};
}
function targetBitrate(width, height, fps, quality) {
	const base = width * height / 2073600 * (fps / 30) * 8e6;
	return Math.round(Math.min(64e6, Math.max(12e5, base * (quality === "very-high" ? 1.55 : quality === "high" ? 1 : .48))));
}
function estimateFileBytes(width, height, fps, quality, duration) {
	return targetBitrate(width, height, fps, quality) * duration * 1.03 / 8;
}
function ExportPanel({ aspect, res, customW, customH, fps, format, quality, fit, showLine, outW, outH, duration, exporting, exportRatio, exportFrame, exportTotal, exportStage, onAspect, onRes, onCustomW, onCustomH, onFps, onFormat, onQuality, onFit, onShowLine, onExport, onCancel }) {
	const { t } = useI18n();
	const estimate = estimateFileBytes(outW, outH, fps, quality, duration);
	const frames = Math.round(duration * fps);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-medium text-fg",
				children: t("export.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: t("export.blurb")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("export.aspect"),
				hint: t("hint.aspect"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
					value: aspect,
					"aria-label": t("export.aspect"),
					"data-testid": "aspect-select",
					onChange: (e) => onAspect(e.target.value),
					children: ASPECTS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: a.id,
						children: t(`aspect.${a.id}`)
					}, a.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("export.res"),
				hint: t("hint.res"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
					value: res,
					"aria-label": t("export.res"),
					"data-testid": "res-select",
					onChange: (e) => onRes(e.target.value),
					children: [
						"1080p",
						"2k",
						"4k",
						"source",
						"custom"
					].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: id,
						children: t(`res.${id}`)
					}, id))
				})
			}),
			res === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("export.width"),
					hint: t("hint.width"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 64,
						max: 7680,
						step: 2,
						"aria-label": t("export.width"),
						value: customW,
						onChange: (e) => onCustomW(Number(e.target.value) || 0)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("export.height"),
					hint: t("hint.height"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 64,
						max: 7680,
						step: 2,
						"aria-label": t("export.height"),
						value: customH,
						onChange: (e) => onCustomH(Number(e.target.value) || 0)
					})
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-sm tabular-nums text-muted",
				children: [
					outW,
					" × ",
					outH,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-faint",
						children: [
							" ",
							"· ",
							frames,
							" frames · ~",
							formatBytes(estimate)
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("export.fps"),
				hint: t("hint.fps"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					value: String(fps),
					onChange: (v) => onFps(Number(v)),
					ariaLabel: t("export.fps"),
					options: [{
						id: "30",
						label: t("export.fps30"),
						hint: t("hint.fps"),
						testId: "fps-30"
					}, {
						id: "60",
						label: t("export.fps60"),
						hint: t("hint.fps"),
						testId: "fps-60"
					}]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("export.format"),
				hint: t("hint.format"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					value: format,
					onChange: onFormat,
					ariaLabel: t("export.format"),
					options: [{
						id: "mp4",
						label: "MP4",
						hint: t("hint.format")
					}, {
						id: "webm",
						label: "WebM",
						hint: t("hint.format")
					}]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("export.quality"),
				hint: t("hint.quality"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					value: quality,
					onChange: onQuality,
					ariaLabel: t("export.quality"),
					options: [
						{
							id: "medium",
							label: t("quality.medium"),
							hint: t("hint.qMedium"),
							testId: "quality-medium"
						},
						{
							id: "high",
							label: t("quality.high"),
							hint: t("hint.qHigh"),
							testId: "quality-high"
						},
						{
							id: "very-high",
							label: t("quality.very-high"),
							hint: t("hint.qVeryHigh"),
							testId: "quality-max"
						}
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("export.fit"),
				hint: t("hint.fit"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
					value: fit,
					"aria-label": t("export.fit"),
					onChange: (e) => onFit(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "cover",
							children: t("fit.cover")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "contain",
							children: t("fit.contain")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "stretch",
							children: t("fit.stretch")
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: t("hint.showLine"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cursor-help decoration-faint underline decoration-dotted underline-offset-4",
						children: t("export.showLine")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: showLine,
						onCheckedChange: onShowLine
					})]
				})
			}),
			exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: exportRatio * 100 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tabular-nums text-muted",
						children: exportStage === "finalizing" ? t("export.finalizing") : t("export.frame", {
							n: exportFrame,
							total: exportTotal
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("hint.cancel"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: onCancel,
							children: t("export.cancel")
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: t("hint.export"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "lg",
					onClick: onExport,
					"data-testid": "export-button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), t("export.button")]
				})
			})
		]
	});
}
function LabelEditor({ title, label, onChange }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 rounded-lg border border-line bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-fg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: t("hint.labelEnable"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cursor-help decoration-faint underline decoration-dotted underline-offset-4",
						children: t("labels.enable")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: label.enabled,
						onCheckedChange: (v) => onChange({
							...label,
							enabled: v
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("labels.kind"),
				hint: t("hint.labelKind"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					value: label.kind,
					onChange: (kind) => onChange({
						...label,
						kind
					}),
					options: [{
						id: "on",
						label: t("labels.on"),
						hint: t("hint.labelKind"),
						testId: "label-kind-on"
					}, {
						id: "off",
						label: t("labels.off"),
						hint: t("hint.labelKind"),
						testId: "label-kind-off"
					}]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("labels.size"),
				hint: t("hint.labelSize"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: .016,
					max: .12,
					step: .001,
					"aria-label": t("labels.size"),
					disabled: !label.enabled,
					value: label.size,
					onChange: (e) => onChange(clampLabel({
						...label,
						size: Number(e.target.value)
					})),
					className: "h-8 w-full cursor-pointer accent-paper disabled:opacity-40"
				})
			})
		]
	});
}
function LabelsPanel({ beforeLabel, afterLabel, onBefore, onAfter }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-medium text-fg",
				children: t("labels.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: t("labels.blurb")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEditor, {
					title: t("labels.before"),
					label: beforeLabel,
					onChange: onBefore
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEditor, {
					title: t("labels.after"),
					label: afterLabel,
					onChange: onAfter
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: t("labels.drag")
			})
		]
	});
}
function evenSize(n) {
	const r = Math.max(2, Math.round(n));
	return r % 2 === 0 ? r : r + 1;
}
function throwIfAborted(signal) {
	if (signal?.aborted) throw new DOMException("Export cancelled", "AbortError");
}
function fileName(width, height, fps, ext) {
	return `juxtaposition-dlss5-${width}x${height}-${fps}fps.${ext}`;
}
async function encodeWithMediabunny(opts, format, codec) {
	const width = evenSize(opts.width);
	const height = evenSize(opts.height);
	const fps = opts.fps;
	const duration = opts.duration;
	const totalFrames = Math.max(1, Math.round(duration * fps));
	const bitrate = targetBitrate(width, height, fps, opts.quality);
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d", {
		alpha: false,
		desynchronized: true
	});
	if (!ctx) throw new Error("Could not create a drawing surface.");
	const target = new BufferTarget();
	const output = new Output({
		format: format === "mp4" ? new Mp4OutputFormat({ fastStart: "in-memory" }) : new WebMOutputFormat(),
		target
	});
	const source = new CanvasSource(canvas, {
		codec,
		quality: new Quality({
			bitrate,
			bitrateMode: "variable"
		}),
		keyFrameInterval: 2
	});
	output.addVideoTrack(source, { frameRate: fps });
	output.setMetadataTags({
		title: "Juxtaposition DLSS5",
		artist: "Marko Njegomir",
		comment: "Made with Grok"
	});
	const cancelOnAbort = () => {
		output.cancel();
	};
	opts.signal?.addEventListener("abort", cancelOnAbort, { once: true });
	try {
		await output.start();
		const frameDur = 1 / fps;
		for (let i = 0; i < totalFrames; i++) {
			throwIfAborted(opts.signal);
			const t = Math.min(duration, i / fps);
			opts.renderFrame(ctx, t);
			await source.add(t, frameDur, { keyFrame: i % Math.round(fps * 2) === 0 });
			if (i % 2 === 0 || i === totalFrames - 1) opts.onProgress?.({
				ratio: (i + 1) / totalFrames * .92,
				frame: i + 1,
				totalFrames,
				stage: "encoding"
			});
		}
		opts.onProgress?.({
			ratio: .94,
			frame: totalFrames,
			totalFrames,
			stage: "finalizing"
		});
		await output.finalize();
	} catch (err) {
		if (output.state === "started" || output.state === "finalizing") try {
			await output.cancel();
		} catch {}
		throw err;
	} finally {
		opts.signal?.removeEventListener("abort", cancelOnAbort);
	}
	const buffer = target.buffer;
	if (!buffer) throw new Error("The encoder finished without producing a file.");
	const mime = format === "mp4" ? "video/mp4" : "video/webm";
	opts.onProgress?.({
		ratio: 1,
		frame: totalFrames,
		totalFrames,
		stage: "finalizing"
	});
	return new Blob([buffer], { type: mime });
}
function pickRecorderMime(format) {
	if (typeof MediaRecorder === "undefined") return null;
	return (format === "mp4" ? [
		"video/mp4;codecs=avc1.640028",
		"video/mp4;codecs=avc1.42E01E",
		"video/mp4",
		"video/webm;codecs=vp9",
		"video/webm"
	] : [
		"video/webm;codecs=vp9",
		"video/webm;codecs=vp8",
		"video/webm",
		"video/mp4"
	]).find((t) => MediaRecorder.isTypeSupported(t)) ?? null;
}
async function encodeWithMediaRecorder(opts) {
	const width = evenSize(opts.width);
	const height = evenSize(opts.height);
	const fps = opts.fps;
	const duration = opts.duration;
	const totalFrames = Math.max(1, Math.round(duration * fps));
	const bitrate = targetBitrate(width, height, fps, opts.quality);
	const mime = pickRecorderMime(opts.format);
	if (!mime) throw new Error("This browser cannot record video. Try Chrome, Edge, or Safari.");
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d", { alpha: false });
	if (!ctx) throw new Error("Could not create a drawing surface.");
	opts.renderFrame(ctx, 0);
	const stream = canvas.captureStream(fps);
	const recorder = new MediaRecorder(stream, {
		mimeType: mime,
		videoBitsPerSecond: bitrate
	});
	const chunks = [];
	recorder.ondataavailable = (e) => {
		if (e.data.size) chunks.push(e.data);
	};
	const stopped = new Promise((resolve, reject) => {
		recorder.onstop = () => resolve();
		recorder.onerror = () => reject(/* @__PURE__ */ new Error("Recording failed."));
	});
	recorder.start(200);
	const frameDurMs = 1e3 / fps;
	const t0 = performance.now();
	for (let i = 0; i < totalFrames; i++) {
		throwIfAborted(opts.signal);
		const t = Math.min(duration, i / fps);
		opts.renderFrame(ctx, t);
		stream.getVideoTracks()[0]?.requestFrame?.();
		opts.onProgress?.({
			ratio: (i + 1) / totalFrames,
			frame: i + 1,
			totalFrames,
			stage: "encoding"
		});
		const wait = t0 + (i + 1) * frameDurMs - performance.now();
		if (wait > 0) await new Promise((r) => setTimeout(r, wait));
		else await new Promise((r) => requestAnimationFrame(() => r(null)));
	}
	recorder.stop();
	stream.getTracks().forEach((tr) => tr.stop());
	await stopped;
	return {
		blob: new Blob(chunks, { type: mime }),
		mime
	};
}
async function exportRevealVideo(opts) {
	throwIfAborted(opts.signal);
	const attempts = opts.format === "mp4" ? [
		{
			format: "mp4",
			codec: "avc"
		},
		{
			format: "mp4",
			codec: "av1"
		},
		{
			format: "webm",
			codec: "vp9"
		}
	] : [
		{
			format: "webm",
			codec: "vp9"
		},
		{
			format: "webm",
			codec: "vp8"
		},
		{
			format: "mp4",
			codec: "avc"
		}
	];
	let lastError;
	if (typeof VideoEncoder !== "undefined") for (const attempt of attempts) {
		throwIfAborted(opts.signal);
		try {
			const blob = await encodeWithMediabunny(opts, attempt.format, attempt.codec);
			const ext = attempt.format === "mp4" ? "mp4" : "webm";
			const fallbackNote = attempt.format !== opts.format ? `Saved as ${ext.toUpperCase()} because ${opts.format.toUpperCase()} is not available in this browser.` : void 0;
			return {
				blob,
				filename: fileName(opts.width, opts.height, opts.fps, ext),
				mime: blob.type,
				usedFormat: attempt.format,
				fallbackNote
			};
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") throw err;
			lastError = err;
		}
	}
	try {
		const rec = await encodeWithMediaRecorder(opts);
		const ext = rec.mime.includes("mp4") ? "mp4" : "webm";
		const usedFormat = ext === "mp4" ? "mp4" : "webm";
		return {
			blob: rec.blob,
			filename: fileName(opts.width, opts.height, opts.fps, ext),
			mime: rec.mime,
			usedFormat,
			fallbackNote: usedFormat !== opts.format ? `Saved as ${ext.toUpperCase()} using this browser's recorder.` : void 0
		};
	} catch (err) {
		if (err instanceof DOMException && err.name === "AbortError") throw err;
		const detail = lastError instanceof Error ? lastError.message : err instanceof Error ? err.message : "Unknown encoder error";
		throw new Error(`Could not encode video. ${detail} Try 1080p or another browser (Chrome / Edge).`);
	}
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 4e3);
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.decoding = "async";
		img.crossOrigin = "anonymous";
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error(`Could not load image: ${src}`));
		img.src = src;
	});
}
async function slotFromFile(file) {
	if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
	const objectUrl = URL.createObjectURL(file);
	return {
		element: await loadImage(objectUrl),
		url: objectUrl,
		name: file.name || "image",
		fromDefault: false,
		objectUrl
	};
}
function revokeSlot(slot) {
	if (slot?.objectUrl) URL.revokeObjectURL(slot.objectUrl);
}
async function loadDefaultSlot(url, name) {
	return {
		element: await loadImage(url),
		url,
		name,
		fromDefault: true
	};
}
function imagesFromClipboard(e) {
	const files = [];
	const items = e.clipboardData?.items;
	if (!items) return files;
	for (const item of items) if (item.type.startsWith("image/")) {
		const file = item.getAsFile();
		if (file) files.push(file);
	}
	return files;
}
function imagesFromDataTransfer(dt) {
	if (!dt) return [];
	const out = [];
	if (dt.files?.length) {
		for (const f of dt.files) if (f.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|bmp|avif|svg)$/i.test(f.name)) out.push(f);
	}
	return out;
}
function Studio() {
	const { t } = useI18n();
	const [before, setBefore] = (0, import_react.useState)(null);
	const [after, setAfter] = (0, import_react.useState)(null);
	const [active, setActive] = (0, import_react.useState)("before");
	const [mode, setMode] = (0, import_react.useState)("seconds");
	const [phases, setPhases] = (0, import_react.useState)(DEFAULT_SECONDS);
	const [totalDuration, setTotalDuration] = (0, import_react.useState)(sumPhases(DEFAULT_SECONDS));
	const [easing, setEasing] = (0, import_react.useState)("cinematic");
	const [motionMode, setMotionMode] = (0, import_react.useState)("auto");
	const [axis, setAxis] = (0, import_react.useState)("vertical");
	const [aspect, setAspect] = (0, import_react.useState)("source");
	const [res, setRes] = (0, import_react.useState)("4k");
	const [customW, setCustomW] = (0, import_react.useState)(1920);
	const [customH, setCustomH] = (0, import_react.useState)(1080);
	const [fps, setFps] = (0, import_react.useState)(60);
	const [format, setFormat] = (0, import_react.useState)("mp4");
	const [quality, setQuality] = (0, import_react.useState)("very-high");
	const [fit, setFit] = (0, import_react.useState)("cover");
	const [showLine, setShowLine] = (0, import_react.useState)(true);
	const [playing, setPlaying] = (0, import_react.useState)(true);
	const [loop, setLoop] = (0, import_react.useState)(true);
	const [currentTime, setCurrentTime] = (0, import_react.useState)(0);
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const [exportRatio, setExportRatio] = (0, import_react.useState)(0);
	const [exportFrame, setExportFrame] = (0, import_react.useState)(0);
	const [exportTotal, setExportTotal] = (0, import_react.useState)(0);
	const [exportStage, setExportStage] = (0, import_react.useState)("encoding");
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [take, setTake] = (0, import_react.useState)(null);
	const [beforeLabel, setBeforeLabel] = (0, import_react.useState)(LABEL_OFF);
	const [afterLabel, setAfterLabel] = (0, import_react.useState)(LABEL_ON);
	const [beforePlacement, setBeforePlacement] = (0, import_react.useState)(DEFAULT_PLACEMENT);
	const [afterPlacement, setAfterPlacement] = (0, import_react.useState)(DEFAULT_PLACEMENT);
	const abortRef = (0, import_react.useRef)(null);
	const dragDepth = (0, import_react.useRef)(0);
	const seconds = (0, import_react.useMemo)(() => resolveSeconds(phases, mode, totalDuration), [
		phases,
		mode,
		totalDuration
	]);
	const autoDuration = (0, import_react.useMemo)(() => resolvedDuration(phases, mode, totalDuration), [
		phases,
		mode,
		totalDuration
	]);
	const duration = motionMode === "manual" ? Math.max(.1, totalDuration) : autoDuration;
	const out = (0, import_react.useMemo)(() => computeOutputSize({
		aspect,
		res,
		customW,
		customH,
		sourceW: before?.element.naturalWidth ?? 1440,
		sourceH: before?.element.naturalHeight ?? 1376
	}), [
		aspect,
		res,
		customW,
		customH,
		before
	]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const [b, a] = await Promise.all([loadDefaultSlot("/images/before.jpg", "ukiyo-e woodblock"), loadDefaultSlot("/images/after.jpg", "photorealistic")]);
				if (cancelled) return;
				setBefore(b);
				setAfter(a);
			} catch {
				toast.error(t("toast.loadFail"));
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!take) return;
		const expected = Math.max(1, Math.round(duration * fps));
		if (take.length !== expected) setTake(null);
	}, [
		duration,
		fps,
		take
	]);
	const assignFile = (0, import_react.useCallback)(async (slot, file) => {
		try {
			const next = await slotFromFile(file);
			if (slot === "before") {
				setBefore((prev) => {
					revokeSlot(prev);
					return next;
				});
				setBeforePlacement(DEFAULT_PLACEMENT);
			} else {
				setAfter((prev) => {
					revokeSlot(prev);
					return next;
				});
				setAfterPlacement(DEFAULT_PLACEMENT);
			}
			setActive(slot);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : t("toast.readFail"));
		}
	}, [t]);
	const assignFiles = (0, import_react.useCallback)(async (files, preferred) => {
		if (files.length >= 2) {
			await assignFile("before", files[0]);
			await assignFile("after", files[1]);
			return;
		}
		if (files[0]) await assignFile(preferred ?? active, files[0]);
	}, [active, assignFile]);
	(0, import_react.useEffect)(() => {
		const onPaste = (e) => {
			const files = imagesFromClipboard(e);
			if (!files.length) return;
			e.preventDefault();
			assignFiles(files);
		};
		window.addEventListener("paste", onPaste);
		return () => window.removeEventListener("paste", onPaste);
	}, [assignFiles]);
	(0, import_react.useEffect)(() => {
		const hasFiles = (e) => e.dataTransfer ? [...e.dataTransfer.types].includes("Files") : false;
		const onEnter = (e) => {
			if (!hasFiles(e)) return;
			e.preventDefault();
			dragDepth.current += 1;
			setDragOver(true);
		};
		const onOver = (e) => {
			if (!hasFiles(e)) return;
			e.preventDefault();
			if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
		};
		const onLeave = (e) => {
			if (!hasFiles(e)) return;
			e.preventDefault();
			dragDepth.current = Math.max(0, dragDepth.current - 1);
			if (dragDepth.current === 0) setDragOver(false);
		};
		const onDrop = (e) => {
			e.preventDefault();
			dragDepth.current = 0;
			setDragOver(false);
			const files = imagesFromDataTransfer(e.dataTransfer);
			if (!files.length) return;
			const w = window.innerWidth;
			const preferred = e.clientX < w / 2 ? "before" : "after";
			assignFiles(files, preferred);
		};
		window.addEventListener("dragenter", onEnter);
		window.addEventListener("dragover", onOver);
		window.addEventListener("dragleave", onLeave);
		window.addEventListener("drop", onDrop);
		return () => {
			window.removeEventListener("dragenter", onEnter);
			window.removeEventListener("dragover", onOver);
			window.removeEventListener("dragleave", onLeave);
			window.removeEventListener("drop", onDrop);
		};
	}, [assignFiles]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
			if (e.code === "Escape" && recording) {
				e.preventDefault();
				setRecording(false);
				return;
			}
			if (e.code === "Space") {
				e.preventDefault();
				if (exporting || recording) return;
				if (motionMode === "manual" && !take) return;
				setPlaying((p) => !p);
			} else if (e.code === "Home") {
				e.preventDefault();
				setCurrentTime(0);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		exporting,
		recording,
		motionMode,
		take
	]);
	const onTimingMode = (next) => {
		if (next === mode) return;
		if (next === "percent") {
			setPhases(toPercents(seconds));
			setTotalDuration(duration);
		} else setPhases(toSeconds(phases, totalDuration));
		setMode(next);
	};
	const onMotionModeChange = (next) => {
		if (next === motionMode) return;
		setPlaying(next === "auto");
		setRecording(false);
		setCurrentTime(0);
		if (next === "manual") {
			setTotalDuration(autoDuration);
			setTake(null);
		}
		setMotionMode(next);
	};
	const onPasteClick = async () => {
		try {
			if (navigator.clipboard && "read" in navigator.clipboard) {
				const items = await navigator.clipboard.read();
				const files = [];
				for (const item of items) {
					const type = item.types.find((t) => t.startsWith("image/"));
					if (!type) continue;
					const blob = await item.getType(type);
					files.push(new File([blob], "pasted-image", { type: blob.type }));
				}
				if (files.length) {
					await assignFiles(files);
					return;
				}
			}
			toast.message(t("toast.pasteHint"));
		} catch {
			toast.message(t("toast.pasteHint"));
		}
	};
	const onSwap = () => {
		setBefore(after);
		setAfter(before);
		setBeforeLabel(afterLabel);
		setAfterLabel(beforeLabel);
		setBeforePlacement(afterPlacement);
		setAfterPlacement(beforePlacement);
	};
	const onTimeTick = (0, import_react.useCallback)((t) => {
		setCurrentTime(t);
		if (t >= duration && !loop) setPlaying(false);
	}, [duration, loop]);
	const runExport = async () => {
		if (!before?.element) {
			toast.error(t("export.needBefore"));
			return;
		}
		if (!after?.element) {
			toast.error(t("export.needAfter"));
			return;
		}
		if (motionMode === "manual" && !take) {
			toast.error(t("export.needTake"));
			return;
		}
		const controller = new AbortController();
		abortRef.current = controller;
		setExporting(true);
		setPlaying(false);
		setExportRatio(0);
		setExportStage("encoding");
		const easeFn = EASINGS[easing];
		const phaseSeconds = seconds;
		const dur = duration;
		const takeSnap = take;
		const fpsSnap = fps;
		const modeSnap = motionMode;
		const axisSnap = axis;
		const beforeLabelSnap = beforeLabel;
		const afterLabelSnap = afterLabel;
		const beforePlaceSnap = beforePlacement;
		const afterPlaceSnap = afterPlacement;
		try {
			const result = await exportRevealVideo({
				width: out.width,
				height: out.height,
				fps,
				duration: dur,
				format,
				quality,
				signal: controller.signal,
				renderFrame: (ctx, time) => {
					const progress = modeSnap === "manual" && takeSnap ? sampleRecorded(takeSnap, time, fpsSnap) : sliderAtTime(time, phaseSeconds, easeFn);
					drawFrame(ctx, {
						before: before.element,
						after: after.element,
						progress,
						fit,
						showLine,
						axis: axisSnap,
						beforeLabel: beforeLabelSnap,
						afterLabel: afterLabelSnap,
						beforePlacement: beforePlaceSnap,
						afterPlacement: afterPlaceSnap
					});
				},
				onProgress: (p) => {
					setExportRatio(p.ratio);
					setExportFrame(p.frame);
					setExportTotal(p.totalFrames);
					setExportStage(p.stage);
				}
			});
			downloadBlob(result.blob, result.filename);
			if (result.usedFormat !== format) toast.success(`${t("export.saved", { name: result.filename })} ${t("export.fallback", {
				ext: result.usedFormat.toUpperCase(),
				wanted: format.toUpperCase()
			})}`);
			else toast.success(t("export.saved", { name: result.filename }));
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") toast.message(t("export.cancelled"));
			else toast.error(err instanceof Error ? err.message : t("export.failed"));
		} finally {
			setExporting(false);
			abortRef.current = null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh flex-col bg-bg text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto flex w-full max-w-screen-2xl flex-1 flex-col gap-8 px-4 py-6 sm:px-6 lg:flex-row lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewStage, {
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
					outW: out.width,
					outH: out.height,
					exporting,
					exportRatio,
					motionMode,
					axis,
					fps,
					recording,
					take,
					beforeLabel,
					afterLabel,
					onTogglePlay: () => setPlaying((p) => !p),
					onPause: () => setPlaying(false),
					onSeek: (tm) => {
						setCurrentTime(tm);
						setPlaying(false);
					},
					onRestart: () => {
						setCurrentTime(0);
						setPlaying(true);
					},
					onLoopChange: setLoop,
					onTimeTick,
					onRecordStart: () => {
						setTake(null);
						setPlaying(false);
						setCurrentTime(0);
						setRecording(true);
					},
					onRecordComplete: (samples) => {
						setTake(samples);
						setRecording(false);
						setCurrentTime(0);
						setPlaying(true);
					},
					onBeforeLabel: setBeforeLabel,
					onAfterLabel: setAfterLabel,
					beforePlacement,
					afterPlacement,
					active,
					onBeforePlacement: setBeforePlacement,
					onAfterPlacement: setAfterPlacement,
					onActive: setActive
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "flex w-full shrink-0 flex-col gap-8 lg:w-96 lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto lg:pr-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageSlots, {
							before,
							after,
							active,
							beforeCanReset: !isDefaultPlacement(beforePlacement),
							afterCanReset: !isDefaultPlacement(afterPlacement),
							onActive: setActive,
							onFile: (slot, file) => void assignFile(slot, file),
							onPasteClick: () => void onPasteClick(),
							onSwap,
							onReset: (slot) => {
								if (slot === "before") setBeforePlacement(DEFAULT_PLACEMENT);
								else setAfterPlacement(DEFAULT_PLACEMENT);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelinePanel, {
							motionMode,
							axis,
							mode,
							phases,
							totalDuration,
							easing,
							duration,
							onMotionMode: onMotionModeChange,
							onAxis: setAxis,
							onMode: onTimingMode,
							onPhases: setPhases,
							onTotal: setTotalDuration,
							onEasing: setEasing
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelsPanel, {
							beforeLabel,
							afterLabel,
							onBefore: setBeforeLabel,
							onAfter: setAfterLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportPanel, {
							aspect,
							res,
							customW,
							customH,
							fps,
							format,
							quality,
							fit,
							showLine,
							outW: out.width,
							outH: out.height,
							duration,
							exporting,
							exportRatio,
							exportFrame,
							exportTotal,
							exportStage,
							onAspect: setAspect,
							onRes: setRes,
							onCustomW: setCustomW,
							onCustomH: setCustomH,
							onFps: setFps,
							onFormat: setFormat,
							onQuality: setQuality,
							onFit: setFit,
							onShowLine: setShowLine,
							onExport: () => void runExport(),
							onCancel: () => abortRef.current?.abort()
						})
					]
				})]
			})]
		}),
		dragOver ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 flex bg-bg/80",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 items-center justify-center border-r border-dashed border-paper/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-fg",
					children: t("drop.before")
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-fg",
					children: t("drop.after")
				})
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "bottom-center",
			toastOptions: { classNames: { toast: "bg-surface text-fg border border-line" } }
		})
	] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {});
}
//#endregion
export { Home as component };
