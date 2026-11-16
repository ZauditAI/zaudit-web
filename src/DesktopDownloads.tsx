import { useState } from 'react';
import { Apple, Download, Monitor } from 'lucide-react';

type Package = { url: string; label: string; sha256: string; bytes: number; architectures?: string[] };
export type DesktopRelease = { version: string; notarized?: boolean; downloads: Record<string, Package> };

export default function DesktopDownloads({ release, close }: { release: DesktopRelease | null; close: () => void }) {
  const [copied, setCopied] = useState('');
  const mac = release?.downloads.mac;
  const windows = release?.downloads.windows;
  const rows = [
    ...(windows ? [{ key: 'windows', item: windows, title: 'Windows', detail: '64-bit installer', icon: Monitor }] : []),
    ...(mac ? [{ key: 'mac', item: mac, title: 'Mac', detail: mac.architectures?.includes('x86_64') ? 'Intel and Apple Silicon · macOS 13+' : 'Apple Silicon · macOS 13+', icon: Apple }] : [])
  ];
  return <>
    <h2>Download Zaudit</h2>
    <div className="download-list">{rows.map(({key,item,title,detail,icon:Icon}) =>
      <div className="download-row" key={key}><Icon/><div><strong>{title}</strong><span>{detail} · {(item.bytes / 1_000_000).toFixed(1)} MB</span></div>
        <a className="button small" href={item.url} download>Download {key === 'mac' ? 'DMG' : 'EXE'} <Download size={15}/></a>
      </div>)}</div>
    {!rows.length && <p>The download list is unavailable. Please reopen this page.</p>}
    {windows && <p><strong>Windows</strong> — Run setup, then open Zaudit Local from Start. This early-access installer may show an unknown-publisher warning.</p>}
    {mac && <p><strong>Mac</strong> — Open the disk image and drag Zaudit Local to Applications. {release?.notarized ? 'The app is signed and notarized.' : 'Apple notarization is pending. macOS may prevent the app from opening.'}</p>}
    <p>Create a company to start keeping books offline. For AI, open AI assistance and sign in with an invited account. <a href="mailto:vaibhavmaloopm@gmail.com?subject=Try%20Zaudit%20AI">Request AI access</a>.</p>
    <p><a href="#/start" onClick={close}>Read the setup and first-entry guide →</a></p><details><summary>What works today</summary><p>Ledgers, vouchers, untaxed invoices, stock, partial payments, bank reconciliation, financial reports, CSV exports and local backups. AI can prepare and review accounting workflows. Windows also supports manual monthly pay runs and ledger history import from supported Tally company ZIPs. GST filing is handled on the GST portal.</p></details>
    {!!rows.length && <details><summary>Verify your download</summary>{rows.map(({key,item,title}) =>
      <div className="checksum" key={key}><strong>{title} · SHA-256</strong><code>{item.sha256}</code><button className="text-button" onClick={async()=>{await navigator.clipboard.writeText(item.sha256);setCopied(key)}}>{copied===key?'Copied':'Copy checksum'}</button></div>
    )}</details>}
  </>;
}
