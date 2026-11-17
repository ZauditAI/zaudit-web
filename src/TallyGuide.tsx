export default function TallyGuide({download}: {download: () => void}) {
  return <>
    <p className="lead">Bring your Tally ledgers and voucher entries into Zaudit on your Mac or Windows PC. The import runs on your computer. You can do it offline, without Tally, Parallels or a Zaudit account.</p>

    <section className="guide-section">
      <h2>1. Find your company files</h2>
      <p><strong>Already have a ZIP?</strong> Save it from your email or drive to Downloads. Open it to look inside. You need one company folder containing these three files together: <code>Manager.1800</code>, <code>TranMgr.1800</code> and <code>VchStatus.1800</code>. Keep the other files with them. If all three are there, go to step 3.</p>
      <p><strong>Have the computer where the books are kept?</strong> Search for <code>TranMgr.1800</code> in File Explorer. Open its folder. If several companies appear, ask your bookkeeper which folder belongs to your business. If they use TallyPrime, its Data menu shows the company data location. <a href="https://help.tallysolutions.com/tally-prime/set-up-tally-prime/set-up-tallyprime-auto-login-language-multiple-addresses/">Find the data location in TallyPrime ↗</a></p>
      <p><strong>Only have a TBK, .900 file or XML export?</strong> This importer needs the supported .1800 company folder. Ask your bookkeeper for “a ZIP of our company data folder containing Manager.1800, TranMgr.1800 and VchStatus.1800.” Renaming a backup to .zip won’t convert it.</p>
    </section>

    <section className="guide-section">
      <h2>2. Make a ZIP of one company</h2>
      <p>If the company is open in Tally, have everyone close it so the files are copied together. Copy the whole company folder to your Desktop. Keep the original in place.</p>
      <p><strong>Windows:</strong> Right-click the copied folder and choose <strong>Compress to ZIP file</strong> or <strong>Send to → Compressed (zipped) folder</strong>.</p>
      <p><strong>Mac:</strong> In Finder, Control-click the copied folder and choose <strong>Compress</strong>. A file ending in <code>.zip</code> appears beside it. If you made the ZIP on a different computer, copy it to the one running Zaudit.</p>
    </section>

    <section className="guide-section">
      <h2>3. Install and open Zaudit Local</h2>
      <button className="button" onClick={download}>Choose a download</button>
      <p><strong>Windows:</strong> Download the EXE, run it, then open <strong>Zaudit Local</strong> from Start. <strong>Apple silicon Mac:</strong> Download the DMG, open it, drag Zaudit Local to Applications and open it from there. <a href="#/start">Installation details →</a></p>
    </section>

    <section className="guide-section">
      <h2>4. Import the ZIP</h2>
      <p>In the Zaudit desktop app, choose <strong>File → Import Tally voucher history…</strong>. On Mac, the File menu is at the top of your screen. Select the ZIP you saved and click <strong>Open</strong>.</p>
      <p><strong>Mac:</strong> Enter a name you’ll recognise and click <strong>Import company</strong>. <strong>Windows:</strong> A list of the source entries opens in your browser. Switch back to Zaudit and click <strong>Yes</strong>.</p>
      <p>Zaudit creates a separate company in Indian rupees. Importing the same ZIP again opens the same set of books without adding duplicate entries.</p>
    </section>

    <section className="guide-section">
      <h2>5. Check your first entry</h2>
      <p>Choose the imported company from the company list. Open <strong>Day book</strong> and set <strong>Period</strong> to dates covered by your backup. Find a payment you recognise. Open it and compare the date, voucher number, ledgers and amount with your records.</p>
      <p>Open <strong>Trial balance</strong> and compare each ledger balance with your Tally figures for the same date. Keep your original backup. Historical invoice settlements, stock movements, GST details and the history of edits are outside this import.</p>
    </section>

    <section className="guide-section">
      <h2>Use AI with your imported books</h2>
      <p>Select the company you imported, connect to the internet and open <strong>AI assistance</strong>. Sign in with your invited account. If the app asks you to activate your trial, <a href="mailto:vaibhavmaloopm@gmail.com?subject=Try%20Zaudit%20AI">email us for access</a>.</p>
      <p>Start with a lookup. For example, type “Show the Cash ledger for April 2025.” Use a ledger name and dates from your company. Choose <strong>Make a plan</strong>. Zaudit sends your request and relevant company records to its AI providers and checks the proposed steps on your computer.</p>
      <p>To record a real payment, include the date, amount, expense ledger and bank or cash ledger. Check those details in the preview, then choose <strong>Approve and run workflow</strong>. Open <strong>Day book</strong> to check the entry. AI uses the records available in Zaudit, so historical bills require verified invoice balances before you can allocate payments against them.</p>
    </section>

    <section className="guide-section">
      <h2>If you get stuck</h2>
      <p><strong>No import option?</strong> Install Mac version 0.18.3 or Windows version 0.18.2 or later. Open Zaudit Local on your computer.</p>
      <p><strong>ZIP rejected?</strong> Check that the three files in step 1 are together in one folder inside the ZIP. If the archive contains several companies, make a ZIP of just the one you want. If Zaudit still shows an error, send us the message and your app version. Keep your company files private.</p>
      <a href="mailto:vaibhavmaloopm@gmail.com?subject=Help%20importing%20Tally%20books">Email for import help →</a>
    </section>
  </>;
}
