const indian = ['Units (ones)', 'Tens', 'Hundreds', 'Thousands', 'Ten thousands', 'Lakhs', 'Ten lakhs', 'Crores', 'Ten crores'];
const international = ['Units (ones)', 'Tens', 'Hundreds', 'Thousands', 'Ten thousands', 'Hundred thousands', 'Millions', 'Ten millions', 'Hundred millions'];
const digits = '123456789'.split('').reverse();

function Chart({ system, labels }: { system: 'Indian' | 'International'; labels: string[] }) {
  return <div className="number-chart"><h3>{system} place-value ladder</h3><p>Start at units and move down this table. Each next place is ten times the previous place.</p>
    <table><caption>The number 123456789 placed in the {system} system</caption><thead><tr><th scope="col">Place</th><th scope="col">Value of one unit</th><th scope="col">Example digit</th><th scope="col">Value of this digit</th></tr></thead><tbody>{labels.map((label, index) => <tr key={label}><th scope="row">{label}</th><td>{(10 ** index).toLocaleString(system === 'Indian' ? 'en-IN' : 'en-US')}</td><td>{digits[index]}</td><td>{(Number(digits[index]) * 10 ** index).toLocaleString(system === 'Indian' ? 'en-IN' : 'en-US')}</td></tr>)}</tbody></table>
  </div>;
}

export function IndianNumberSystem() {
  return <section className="number-system-lesson"><h2>Read a number in the Indian system</h2><Chart system="Indian" labels={indian} />
    <div className="number-periods indian-periods"><span><b>12</b>Crores</span><span><b>34</b>Lakhs</span><span><b>56</b>Thousands</span><span><b>789</b>Ones</span></div>
    <p className="number-spoken"><strong>12,34,56,789</strong><br />Say: “Twelve crore thirty-four lakh fifty-six thousand seven hundred and eighty-nine.”</p>
    <ol><li>Start from the right. Keep the last three digits together: 789.</li><li>Then make groups of two: 56, 34, 12.</li><li>Read each group from left to right with its period name: crore, lakh, thousand, then the ones group.</li></ol>
    <p><strong>Remember:</strong> lakh and crore are period names. Ten lakhs and ten crores are individual places inside those periods. A zero keeps a place occupied, but you do not read an entirely zero period aloud.</p>
  </section>;
}

export function InternationalNumberSystem() {
  return <section className="number-system-lesson"><h2>Read the same number in the International system</h2><Chart system="International" labels={international} />
    <div className="number-periods"><span><b>123</b>Millions</span><span><b>456</b>Thousands</span><span><b>789</b>Ones</span></div>
    <p className="number-spoken"><strong>123,456,789</strong><br />Say: “One hundred and twenty-three million four hundred and fifty-six thousand seven hundred and eighty-nine.”</p>
    <ol><li>Start from the right and make groups of three every time: 789, 456, 123.</li><li>Read left to right: millions, thousands, then the ones group.</li><li>The digits and the value are unchanged. Only the commas and the group names change.</li></ol>
    <aside className="study-before"><strong>Indian and International: what changes?</strong><p>Indian grouping: 12 | 34 | 56 | 789. International grouping: 123 | 456 | 789.</p><p>1 lakh = 100 thousand. 10 lakh = 1 million. 1 crore = 10 million. 10 crore = 100 million.</p><p>For example: 1,00,00,000 (one crore) and 10,000,000 (ten million) name the same value.</p></aside>
    <details className="study-answer"><summary>Predict first: read 5,07,03,020 in both systems</summary><div><p><strong>Indian:</strong> Five crore seven lakh three thousand and twenty.</p><p><strong>International:</strong> 50,703,020 — fifty million seven hundred and three thousand and twenty.</p><p>The zeros stay in the written number. Do not remove them when moving the commas.</p></div></details>
  </section>;
}
