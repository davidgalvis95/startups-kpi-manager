import { colorsPallete } from "./ColorsPallete";

class ColorSelection {
  selectedIndexesByChart: string[] = [];
  selectedIndex: number = -1;
  private static instance: ColorSelection;
  member: number;

  constructor() {
    if (ColorSelection.instance) {
      throw new Error("Error - use Singleton.getInstance()");
    }
    this.member = 0;
  }

  static getInstance(): ColorSelection {
    ColorSelection.instance = ColorSelection.instance || new ColorSelection();
    return ColorSelection.instance;
  }

  setSelectedIndexByChart(array: string[]) {
    this.selectedIndexesByChart = array;
  }

  public selectColor(chartType: string): string[] {
    this.colorSelectionAlgorithm(chartType);

    const values = Object.values(colorsPallete);

    // console.log(values);

    return new Array<string>(
      values
        .filter(
          (element: string, index: number) => index === this.selectedIndex
        )
        .map((element: string) => element)[0],

      values
        .filter(
          (element: string, index: number) => index === this.selectedIndex + 1
        )
        .map((element: string) => element)[0]
    );
  }

  private colorSelectionAlgorithm(chartType: string): void {
    const colorsPaleteLength: number = Object.entries(colorsPallete).length;

    if (
      this.selectedIndexesByChart.filter((element) =>
        element.includes(chartType)
      ).length === colorsPaleteLength
    ) {
      this.setSelectedIndexByChart([]);
    }

    const indexToEvaluate: number = Math.floor(
      Math.random() * colorsPaleteLength
    );
    //   Math.floor(Math.random() * colorsPaleteLength) % 2 == 0
    //     ? Math.floor(Math.random() * colorsPaleteLength)
    //     : Math.floor(Math.random() * colorsPaleteLength) - 1;
    if (this.extractCorrectIndex(chartType, indexToEvaluate) !== -1) {
      this.selectedIndex = this.extractCorrectIndex(chartType, indexToEvaluate);
    } else {
      //Recursive operation to search again for a color if the selected one is already taken
      this.colorSelectionAlgorithm(chartType);
    }
  }

  private extractCorrectIndex(chartType: string, index: number): number {
    const valueToSearch: string = index
      .toString()
      .concat(" ")
      .concat(chartType);

    const correctIndex: number = this.selectedIndexesByChart.find(
      (value) => valueToSearch === value
    )
      ? this.selectedIndexesByChart
          .filter((value) => valueToSearch === value)
          .map((val, index) => index)[0]
      : -1;

    if (correctIndex === -1) {
      this.selectedIndexesByChart.push(
        correctIndex.toString().concat(" ").concat(chartType)
      );
      this.selectedIndexesByChart.push(
        (correctIndex + 1).toString().concat(" ").concat(chartType)
      );
      return index;
    } else {
      return -1;
    }
  }

  hexToRGB(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
}

export default ColorSelection;
