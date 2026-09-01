import Navbar from "../componenets/navbar";
import "./programme.css";

function ProgrammePage() {
  interface Card {
    title: string;
    numberofdept: string;
  }
  const programmebox: Card[] = [
    {
      title: "Faculty of engineering",
      numberofdept: "8 depratments",
    },
    {
      title: "Faculty of Science",
      numberofdept: "20 departments",
    },
    {
      title: "Faculty of Accounting",
      numberofdept: "4 departments",
    },
    {
      title: "Faculty of Medcine",
      numberofdept: "7 departments",
    },
    {
      title: "Faculty of Nursing",
      numberofdept: "12 departments",
    },
    {
      title: "Faculty of Aeropilots",
      numberofdept: "3 departments",
    },
    {
      title: "Faculty of Art",
      numberofdept: "4 departments",
    },
    {
      title: "Faculty of Socialart",
      numberofdept: "5 departments",
    },
  ];

  return (
    <>
      <div className="programme-background">
        <div className="line-one">
          <hr />
        </div>

        <div className="programme-body">
          <Navbar />
        </div>
        <div>
          <hr />
        </div>
        <div className="programme-body">
          <h4 id="programme-name">Programmes</h4>
          <div className="programmerbox-container">
            {programmebox.map((Card) => (
              <div className="container-box">
                <p>
                  <b>{Card.title}</b>
                </p>
                <p>{Card.numberofdept} </p>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="down-text-top">
          <div className="down-text">
            <p>@ since 2026 Federal university </p>
            <p>Privacy</p>
            <p>Terms</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProgrammePage;
