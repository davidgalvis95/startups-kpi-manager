import { StartUpBodyRowContent } from "../../types/types";
import cube from "../images/cube_logo.jpg";
import { v4 as uuid } from "uuid";

export function buildSampleRowContent(): StartUpBodyRowContent[] {
  const sampleRowContents: StartUpBodyRowContent[] = [];

  for (let i: number = 0; i < 50; i++) {
    sampleRowContents.push({
      id: uuid(),
      photoUrl: "./assets/images/cube_logo.jpg",
      name: i>25?"Triangle S.A.S":"Cube S.A.S",
      status: i % 2 == 0 ? "Activa" : "Inactiva",
      address: "Cll 100 # 20 - 55 oficina 103",
      city: "Bogota",
      affiliationDate: "3-03-2022",
    });
  }
  return sampleRowContents;
}
