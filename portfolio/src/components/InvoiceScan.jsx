// Plate 1, until there's a real screenshot: a sample Thai tax invoice being read.
// A scan line runs down the sheet; each field it passes gets a detection box and lights
// up in the extracted JSON beside it (with the Buddhist-era date normalised, the way the
// pipeline has to). Pure CSS animation, timed from each field's position on the sheet.
import './InvoiceScan.css'

const SCAN_S = 4 // seconds for the line to cross the sheet; the loop is 6s

const FIELDS = [
  { key: 'tax_id', tag: 'TAX_ID', conf: '0.97', at: 0.3, label: 'เลขประจำตัวผู้เสียภาษี', value: '0105556012345', json: '"0105556012345"' },
  { key: 'date', tag: 'DATE', conf: '0.99', at: 0.42, label: 'วันที่', value: '12/03/2569', json: '"2026-03-12"' },
  { key: 'total', tag: 'TOTAL', conf: '0.95', at: 0.84, label: 'รวมทั้งสิ้น', value: '4,280.00', json: '4280.00' },
]

const delay = (f) => ({ '--at': `${f.at * 100}%`, '--d': `${(f.at * SCAN_S).toFixed(2)}s` })

export default function InvoiceScan() {
  return (
    <div
      className="inv"
      role="img"
      aria-label="Illustration: a sample Thai tax invoice. The tax ID, date and total are detected and extracted as JSON."
    >
      <div className="inv-sheet">
        <div className="inv-head">
          <div>
            <b>ใบกำกับภาษี</b>
            <span>TAX INVOICE</span>
          </div>
          <span className="inv-logo" />
        </div>
        <span className="inv-bar" style={{ top: '19%', width: '46%' }} />
        <span className="inv-bar" style={{ top: '23%', width: '30%' }} />

        {FIELDS.map((f) => (
          <div key={f.key} className={`inv-field inv-${f.key}`} style={delay(f)}>
            <span className="inv-label">{f.label}</span>
            <span className="inv-value">{f.value}</span>
            <span className="inv-box"><span className="inv-tag">{f.tag} {f.conf}</span></span>
          </div>
        ))}

        {[56, 62, 68].map((top) => (
          <div key={top} className="inv-item" style={{ top: `${top}%` }}>
            <span /><span />
          </div>
        ))}
        <span className="inv-stamp">SAMPLE</span>
        <span className="inv-scan" />
      </div>

      <pre className="inv-json">
        <span className="inv-json-k">{'{'}</span>
        {FIELDS.map((f, i) => (
          <span key={f.key} className="inv-json-line" style={delay(f)}>
            {'  '}<span className="inv-json-k">"{f.key}"</span>: {f.json}{i < FIELDS.length - 1 ? ',' : ''}
          </span>
        ))}
        <span className="inv-json-k">{'}'}</span>
      </pre>
    </div>
  )
}
