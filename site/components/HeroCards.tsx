/** Illustrative product cards beside the hero. Labelled as examples so they
 *  are not read as claims about a specific customer's outcome. */
export default function HeroCards() {
  return (
    <div>
      <div className="hero-cards">
        <div className="hc hc1">
          <div className="hc-row">
            <div className="hc-ic hc-ic-r">🏠</div>
            <div>
              <div className="hc-lbl">Home Loan Approved</div>
              <div className="hc-val">₹45,00,000</div>
            </div>
          </div>
          <div className="hc-badge">✓ Disbursed</div>
          <div className="hc-prog">
            <div className="hc-prog-bar">
              <div className="hc-prog-fill" />
            </div>
            <div className="hc-prog-lbl">
              <span>Application</span>
              <span>Disbursed</span>
            </div>
          </div>
        </div>

        <div className="hc hc2">
          <div className="hc-row">
            <div className="hc-ic hc-ic-g">💼</div>
            <div>
              <div className="hc-lbl">Business Loan</div>
              <div className="hc-val">₹20,00,000</div>
            </div>
          </div>
          <div
            className="hc-badge"
            style={{
              background: 'rgba(200,169,110,.12)',
              borderColor: 'rgba(200,169,110,.3)',
              color: 'var(--gold2)',
            }}
          >
            ↓ 10.5% interest rate
          </div>
        </div>

        <div className="hc hc3">
          <div className="hc-row">
            <div className="hc-ic hc-ic-n">⭐</div>
            <div>
              <div className="hc-lbl">Your CIBIL Score</div>
              <div className="hc-val" style={{ color: 'var(--red)' }}>
                785 Excellent
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: '.85rem',
              height: 5,
              background: 'var(--cream2)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '87%',
                height: '100%',
                background: 'linear-gradient(90deg,var(--red),var(--gold))',
                borderRadius: 3,
              }}
            />
          </div>
          <div style={{ fontSize: '.68rem', color: 'var(--txt3)', marginTop: '.38rem' }}>
            Excellent credit profile — eligible for all loans
          </div>
        </div>
      </div>
      <div className="hero-illus">Illustrative examples</div>
    </div>
  );
}
