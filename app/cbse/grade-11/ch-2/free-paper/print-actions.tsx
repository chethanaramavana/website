'use client';

export default function PrintActions() {
  function print(solutions: boolean) {
    const scheme = document.querySelector<HTMLDetailsElement>('#marking-scheme');
    const wasOpen = scheme?.open ?? false;
    if (scheme && solutions) scheme.open = true;
    document.body.classList.toggle('print-relations-solutions', solutions);
    window.print();
    document.body.classList.remove('print-relations-solutions');
    if (scheme) scheme.open = wasOpen;
  }
  return <div className="relations-paper-actions"><button onClick={() => print(false)}>Print question paper / Save PDF</button><button onClick={() => print(true)}>Print worked marking scheme / Save PDF</button><a href="#marking-scheme">View solutions</a></div>;
}
