import mjml2html from "mjml";


export const mjml1 = mjml2html(`
    <mjml>
      <mj-body>
        <mj-section background-color="#f9f9f9" padding="20px">
          <mj-column>
            <mj-text font-size="20px" color="#4caf50" align="center">Your App</mj-text>
          </mj-column>
        </mj-section>
        <mj-section padding="20px">
          <mj-column>
            <mj-text font-size="16px" color="#555">Your verification code is:</mj-text>
            <mj-text font-size="24px" font-weight="bold" color="#4caf50">${code}</mj-text>
            <mj-text font-size="14px" color="#888">This code will expire in 10 minutes.</mj-text>
          </mj-column>
        </mj-section>
        <mj-section background-color="#f9f9f9" padding="10px">
          <mj-column>
            <mj-text font-size="12px" color="#aaa" align="center">
              If you did not request this email, please ignore it.
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `);