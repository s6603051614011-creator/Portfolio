const base = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
}

export const AlertIcon = (p) => (<svg {...base} width={18} height={18} strokeWidth={2} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.01" /></svg>)
export const CheckIcon = (p) => (<svg {...base} width={26} height={26} strokeWidth={2.2} {...p}><path d="M5 12l5 5 9-10" /></svg>)
