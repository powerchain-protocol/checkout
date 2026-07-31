import { useState } from "react";
import {
  CheckIcon,
  Cross2Icon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import type { ClientRecord } from "../../data/clients";

const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

export function PowerPos({ client }: { client: ClientRecord }) {
  const [amount, setAmount] = useState("245.00");
  const [status, setStatus] = useState<"ready" | "sent">("ready");

  function press(value: string) {
    if (amount === "0") {
      setAmount(value === "." ? "0." : value);
      return;
    }
    setAmount((current) => current + value);
  }

  return (
    <section className="pos-workspace">
      <header className="merchant-checkout__header">
        <div>
          <p className="eyebrow">PowerPOS</p>
          <h2>Counter payment terminal</h2>
          <p>
            Fast merchant checkout for in-person payments, receipts, and
            instant settlement.
          </p>
        </div>
        <span className={`pos-status ${status}`}>
          {status === "ready" ? "Terminal ready" : "Request sent"}
        </span>
      </header>

      <div className="pos-grid">
        <section className="pos-terminal">
          <div className="pos-display">
            <small>Charge {client.name}</small>
            <strong>${amount}</strong>
            <span>USD</span>
          </div>

          <div className="pos-keypad">
            {keypad.map((key) => (
              <button key={key} type="button" onClick={() => press(key)}>
                {key}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAmount((current) => current.slice(0, -1) || "0")}
            >
              <Cross2Icon />
            </button>
          </div>

          <button
            className="primary-button pos-charge"
            type="button"
            onClick={() => setStatus("sent")}
          >
            <PaperPlaneIcon />
            Send payment request
          </button>
        </section>

        <section className="pos-side">
          <div className="pos-client">
            <span className="client-avatar large">{client.initials}</span>
            <div>
              <p className="eyebrow">Customer</p>
              <h3>{client.name}</h3>
              <span>{client.email}</span>
            </div>
          </div>

          <div className="pos-methods">
            <h3>Accept payment</h3>
            <button type="button"><span>QR</span> Scan wallet</button>
            <button type="button"><span>NFC</span> Tap device</button>
            <button type="button"><span>LINK</span> Send checkout link</button>
          </div>

          <div className="pos-receipt">
            <CheckIcon />
            <div>
              <strong>Automatic receipt</strong>
              <small>Email and on-chain receipt after settlement.</small>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
