import express, { Request, Response } from "express";
import cors from "cors";
import { OPCUAClient, AttributeIds, TimestampsToReturn, ClientSession } from "node-opcua";

const app = express();
const port = 3001;

app.use(cors());

const endpointUrl = "opc.tcp://172.21.2.1:4840";

const client = OPCUAClient.create({ endpointMustExist: false });

let session: ClientSession | null = null;

async function connectToMachine() {
  try {
    await client.connect(endpointUrl);
    session = await client.createSession();
    console.log("Connected to OPC-UA machine");
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

connectToMachine();

app.get("/api/machine-status", async function (req: Request, res: Response):Promise<void> {


  if (!session) {
    res.status(500).json({ error: "Not connected to machine" });
    return;
  }

  try {
    const [att, att1, att2, att3, xG1_MB1, xG1_MB11, xG1_MB12, xG1_MB13, xG1_MB14, xG1_MB2, xG1_MB3, xG1_MB4, xG1_PF1, xG1_PF11, xG2_MB1, xG2_MB2, xG2_QA1_li, xG2_QA1_re, xS1_SF2H1, xS1_SF3H1, FromRob, MapFromRob,
        xEmg,
        xG1_BG1,
        xG1_BG11,
        xG1_BG12,
        xG1_BG13,
        xG1_BG14,
        xG1_BG15,
        xG1_BG16,
        xG1_BG17,
        xG1_BG2,
        xG1_BG3,
        xG1_BG4,
        xG1_BG5,
        xG1_BG6,
        xG1_BG7,
        xG2_BG1,
        xG2_BG2,
        xG2_BG3,
        xG2_BG4,
        xS1_SF2,
        xS1_SF3,
        xSTU,
        xnotBG15,
        xnotBG16,
        xnotBG5,
        xnotBG6] = await Promise.all([
      session.read({
        // Outputs
        nodeId: `"ns=3;s="xT1_QA1_li"`,
        attributeId: AttributeIds.Value,
      }),
      session.read({
        nodeId: `"ns=3;s="xT1_QA1_re"`,
        attributeId: AttributeIds.Value,
      }),
      session.read({
        nodeId: `"ns=3;s="xT1_QA2_li"`,
        attributeId: AttributeIds.Value,
      }),    
      session.read({
        nodeId: `"ns=3;s="xT1_QA2_re"`,
        attributeId: AttributeIds.Value,
      }),  
      session.read({ nodeId: `"ns=3;s="xG1_MB1"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG1_MB11"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG1_MB12"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG1_MB13"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG1_MB14"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG1_MB2"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG1_MB3"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG1_MB4"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG1_PF1"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG1_PF11"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG2_MB1"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG2_MB2"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG2_QA1_li"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xG2_QA1_re"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xS1_SF2H1"`, attributeId: AttributeIds.Value }),
      session.read({ nodeId: `"ns=3;s="xS1_SF3H1"`, attributeId: AttributeIds.Value }),

    //   Inputs

    session.read({ nodeId: `"ns=3;s="FromRob"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="MapFromRob"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xEmg"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG1"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG11"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG12"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG13"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG14"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG15"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG16"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG17"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG2"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG3"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG4"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG5"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG6"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG1_BG7"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG2_BG1"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG2_BG2"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG2_BG3"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xG2_BG4"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xS1_SF2"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xS1_SF3"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xSTU"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xnotBG15"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xnotBG16"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xnotBG5"`, attributeId: AttributeIds.Value }),
    session.read({ nodeId: `"ns=3;s="xnotBG6"`, attributeId: AttributeIds.Value }),
    


    ]);

    res.json({
        // Outputs
      Conveyor1Forward: att.value.value,
      Conveyor1Backward: att1.value.value,
      Conveyor2Forward: att2.value.value,
      Conveyor2Backward: att3.value.value,
      xG1_MB1: xG1_MB1.value.value,
      xG1_MB11: xG1_MB11.value.value,
      xG1_MB12: xG1_MB12.value.value,
      xG1_MB13: xG1_MB13.value.value,
      xG1_MB14: xG1_MB14.value.value,
      xG1_MB2: xG1_MB2.value.value,
      xG1_MB3: xG1_MB3.value.value,
      xG1_MB4: xG1_MB4.value.value,
      xG1_PF1: xG1_PF1.value.value,
      xG1_PF11: xG1_PF11.value.value,
      xG2_MB1: xG2_MB1.value.value,
      xG2_MB2: xG2_MB2.value.value,
      xG2_QA1_li: xG2_QA1_li.value.value,
      xG2_QA1_re: xG2_QA1_re.value.value,
      xS1_SF2H1: xS1_SF2H1.value.value,
      xS1_SF3H1: xS1_SF3H1.value.value,

    //   Inputs
    FromRob: FromRob.value.value,
    MapFromRob: MapFromRob.value.value,
    xEmg: xEmg.value.value,
    xG1_BG1: xG1_BG1.value.value,
    xG1_BG11: xG1_BG11.value.value,
    xG1_BG12: xG1_BG12.value.value,
    xG1_BG13: xG1_BG13.value.value,
    xG1_BG14: xG1_BG14.value.value,
    xG1_BG15: xG1_BG15.value.value,
    xG1_BG16: xG1_BG16.value.value,
    xG1_BG17: xG1_BG17.value.value,
    xG1_BG2: xG1_BG2.value.value,
    xG1_BG3: xG1_BG3.value.value,
    xG1_BG4: xG1_BG4.value.value,
    xG1_BG5: xG1_BG5.value.value,
    xG1_BG6: xG1_BG6.value.value,
    xG1_BG7: xG1_BG7.value.value,
    xG2_BG1: xG2_BG1.value.value,
    xG2_BG2: xG2_BG2.value.value,
    xG2_BG3: xG2_BG3.value.value,
    xG2_BG4: xG2_BG4.value.value,
    xS1_SF2: xS1_SF2.value.value,
    xS1_SF3: xS1_SF3.value.value,
    xSTU: xSTU.value.value,
    xnotBG15: xnotBG15.value.value,
    xnotBG16: xnotBG16.value.value,
    xnotBG5: xnotBG5.value.value,
    xnotBG6: xnotBG6.value.value,
    

    });
  } catch (err) {
    res.status(500).json({ error: "Failed to read from machine", details: err });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
