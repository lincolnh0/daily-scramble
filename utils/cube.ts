import seedrandom from "seedrandom";

export default class Cube {

  cubeFaces: { [key: string]: string[][] };
  faceColours: { [key: string]: string } = {
    "Y": "yellow",
    "G": "green",
    "O": "coral",
    "B": "blue",
    "R": "red",
    "W": "white",
  }

  /**
   * Creates a new instance of the Cube class.
   */
  constructor(initialScramble: string[] = []) {
    this.cubeFaces = {
      "D": [
        ["Y", "Y", "Y"],
        ["Y", "Y", "Y"],
        ["Y", "Y", "Y"],
      ],
      "U": [
        ["W", "W", "W"],
        ["W", "W", "W"],
        ["W", "W", "W"],
      ],
      "F": [
        ["G", "G", "G"],
        ["G", "G", "G"],
        ["G", "G", "G"]
      ],
      "B": [
        ["B", "B", "B"],
        ["B", "B", "B"],
        ["B", "B", "B"]
      ],
      "R": [
        ["R", "R", "R"],
        ["R", "R", "R"],
        ["R", "R", "R"],
      ],
      "L": [
        ["O", "O", "O"],
        ["O", "O", "O"],
        ["O", "O", "O"],
      ],
    }

    if (initialScramble.length > 0) {
      this.scramble(initialScramble);
    }
  }

  // Helper function to transpose a matrix.
  protected transpose = (matrix: string[][]) => matrix[0].map((_, i) => matrix.map(row => row[i]));

  public rotateFace(move: string): void {
    const face = move[0];
    const modifier = move.replaceAll(face, "");

    const faceCopy = JSON.parse(JSON.stringify(this.cubeFaces[face]));

    // TODO: check if B face rotation is valid.

    // Direct face rotation.
    if (!modifier) {
      this.cubeFaces[face][0] = this.transpose(faceCopy)[0].reverse();
      this.cubeFaces[face][1] = this.transpose(faceCopy)[1].reverse();
      this.cubeFaces[face][2] = this.transpose(faceCopy)[2].reverse();
    } else if (modifier === "'") {
      this.cubeFaces[face][0] = this.transpose(faceCopy)[2];
      this.cubeFaces[face][1] = this.transpose(faceCopy)[1];
      this.cubeFaces[face][2] = this.transpose(faceCopy)[0];
    } else if (modifier === "2") {
      this.cubeFaces[face][0] = faceCopy[2].reverse();
      this.cubeFaces[face][1] = faceCopy[1].reverse();
      this.cubeFaces[face][2] = faceCopy[0].reverse();
    }

    // Rotate adjacent faces.
    this.rotateAdjacentFaces(face, modifier);

  }

  /**
   * Rotates adjacent faces to the face being rotated.
   * @param face The face being rotated.
   * @param modifier The modifier of the rotation.
   * @profile
   */
  protected rotateAdjacentFaces(face: string, modifier: string): void {

    const transposedCubeFaces: { [key: string]: string[][] } = {
      "U": this.transpose(this.cubeFaces["U"]),
      "D": this.transpose(this.cubeFaces["D"]),
      "F": this.transpose(this.cubeFaces["F"]),
      "B": this.transpose(this.cubeFaces["B"]),
      "R": this.transpose(this.cubeFaces["R"]),
      "L": this.transpose(this.cubeFaces["L"]),
    }

    /**
     * Cube faces read top to bottom, left to right.
     * F and B face rotations require transposed left and right face.
     * R and L face rotations require transposed top, bottom, front and back face.
     * U and D face rotations require no transposition.
     */
    const edgeMapping: { [key: string]: { [key: string]: string[] } } = {
      "U": {
        "L": this.cubeFaces["L"][0],
        "R": this.cubeFaces["R"][0],
        "T": this.cubeFaces["B"][0],
        "B": this.cubeFaces["F"][0],
      },
      "D": {
        "L": this.cubeFaces["L"][2],
        "R": this.cubeFaces["R"][2],
        "T": this.cubeFaces["F"][2],
        "B": this.cubeFaces["B"][2],
      },
      "B": {
        "L": transposedCubeFaces["R"][2],
        "R": transposedCubeFaces["L"][0],
        "T": this.cubeFaces["U"][0],
        "B": this.cubeFaces["D"][2],
      },
      "F": {
        "L": transposedCubeFaces["L"][2],
        "R": transposedCubeFaces["R"][0],
        "T": this.cubeFaces["U"][2],
        "B": this.cubeFaces["D"][0],
      },
      "R": {
        "L": transposedCubeFaces["F"][2],
        "R": transposedCubeFaces["B"][0],
        "T": transposedCubeFaces["U"][2],
        "B": transposedCubeFaces["D"][2],
      },
      "L": {
        "L": transposedCubeFaces["B"][2],
        "R": transposedCubeFaces["F"][0],
        "T": transposedCubeFaces["U"][0],
        "B": transposedCubeFaces["D"][0],
      },
    }

    switch (face) {
      case "U":
        if (!modifier) {
          this.cubeFaces["L"][0] = edgeMapping[face]["B"];
          this.cubeFaces["R"][0] = edgeMapping[face]["T"];
          this.cubeFaces["F"][0] = edgeMapping[face]["R"];
          this.cubeFaces["B"][0] = edgeMapping[face]["L"];
        } else if (modifier === "'") {
          this.cubeFaces["L"][0] = edgeMapping[face]["T"];
          this.cubeFaces["R"][0] = edgeMapping[face]["B"];
          this.cubeFaces["F"][0] = edgeMapping[face]["L"];
          this.cubeFaces["B"][0] = edgeMapping[face]["R"];
        } else if (modifier === "2") {
          this.cubeFaces["L"][0] = edgeMapping[face]["R"];
          this.cubeFaces["R"][0] = edgeMapping[face]["L"];
          this.cubeFaces["F"][0] = edgeMapping[face]["T"];
          this.cubeFaces["B"][0] = edgeMapping[face]["B"];
        }
        break;
      case "D":
        if (!modifier) {
          this.cubeFaces["L"][2] = edgeMapping[face]["B"];
          this.cubeFaces["R"][2] = edgeMapping[face]["T"];
          this.cubeFaces["F"][2] = edgeMapping[face]["L"];
          this.cubeFaces["B"][2] = edgeMapping[face]["R"];
        } else if (modifier === "'") {
          this.cubeFaces["L"][2] = edgeMapping[face]["T"];
          this.cubeFaces["R"][2] = edgeMapping[face]["B"];
          this.cubeFaces["F"][2] = edgeMapping[face]["R"];
          this.cubeFaces["B"][2] = edgeMapping[face]["L"];
        } else if (modifier === "2") {
          this.cubeFaces["L"][2] = edgeMapping[face]["R"];
          this.cubeFaces["R"][2] = edgeMapping[face]["L"];
          this.cubeFaces["F"][2] = edgeMapping[face]["B"];
          this.cubeFaces["B"][2] = edgeMapping[face]["T"];
        }
        break;
      case "F":
        if (!modifier) {
          this.cubeFaces["U"][2] = edgeMapping[face]["L"].reverse();
          this.cubeFaces["D"][0] = edgeMapping[face]["R"].reverse();

          this.cubeFaces["L"] = transposedCubeFaces["L"];
          this.cubeFaces["L"][2] = edgeMapping[face]["B"];
          this.cubeFaces["L"] = this.transpose(this.cubeFaces["L"]);

          this.cubeFaces["R"] = transposedCubeFaces["R"];
          this.cubeFaces["R"][0] = edgeMapping[face]["T"];
          this.cubeFaces["R"] = this.transpose(this.cubeFaces["R"]);
        } else if (modifier === "'") {
          this.cubeFaces["U"][2] = edgeMapping[face]["R"];
          this.cubeFaces["D"][0] = edgeMapping[face]["L"];

          this.cubeFaces["L"] = transposedCubeFaces["L"];
          this.cubeFaces["L"][2] = edgeMapping[face]["T"].reverse();
          this.cubeFaces["L"] = this.transpose(this.cubeFaces["L"]);

          this.cubeFaces["R"] = transposedCubeFaces["R"];
          this.cubeFaces["R"][0] = edgeMapping[face]["B"].reverse();
          this.cubeFaces["R"] = this.transpose(this.cubeFaces["R"]);
        } else if (modifier === "2") {
          this.cubeFaces["U"][2] = edgeMapping[face]["B"].reverse();
          this.cubeFaces["D"][0] = edgeMapping[face]["T"].reverse();

          this.cubeFaces["L"] = transposedCubeFaces["L"];
          this.cubeFaces["L"][2] = edgeMapping[face]["R"].reverse();
          this.cubeFaces["L"] = this.transpose(this.cubeFaces["L"]);

          this.cubeFaces["R"] = transposedCubeFaces["R"];
          this.cubeFaces["R"][0] = edgeMapping[face]["L"].reverse();
          this.cubeFaces["R"] = this.transpose(this.cubeFaces["R"]);
        }
        break;
      case "B":
        if (!modifier) {
          this.cubeFaces["U"][0] = edgeMapping[face]["L"];
          this.cubeFaces["D"][2] = edgeMapping[face]["R"];

          this.cubeFaces["L"] = transposedCubeFaces["L"];
          this.cubeFaces["L"][0] = edgeMapping[face]["T"].reverse();
          this.cubeFaces["L"] = this.transpose(this.cubeFaces["L"]);

          this.cubeFaces["R"] = transposedCubeFaces["R"];
          this.cubeFaces["R"][2] = edgeMapping[face]["B"].reverse();
          this.cubeFaces["R"] = this.transpose(this.cubeFaces["R"]);
        } else if (modifier === "'") {
          this.cubeFaces["U"][0] = edgeMapping[face]["R"].reverse();
          this.cubeFaces["D"][2] = edgeMapping[face]["L"].reverse();

          this.cubeFaces["L"] = transposedCubeFaces["L"];
          this.cubeFaces["L"][0] = edgeMapping[face]["B"];
          this.cubeFaces["L"] = this.transpose(this.cubeFaces["L"]);

          this.cubeFaces["R"] = transposedCubeFaces["R"];
          this.cubeFaces["R"][2] = edgeMapping[face]["T"];
          this.cubeFaces["R"] = this.transpose(this.cubeFaces["R"]);
        } else if (modifier === "2") {
          this.cubeFaces["U"][0] = edgeMapping[face]["B"].reverse();
          this.cubeFaces["D"][2] = edgeMapping[face]["T"].reverse();

          this.cubeFaces["L"] = transposedCubeFaces["L"];
          this.cubeFaces["L"][0] = edgeMapping[face]["L"].reverse();
          this.cubeFaces["L"] = this.transpose(this.cubeFaces["L"]);

          this.cubeFaces["R"] = transposedCubeFaces["R"];
          this.cubeFaces["R"][2] = edgeMapping[face]["R"].reverse();
          this.cubeFaces["R"] = this.transpose(this.cubeFaces["R"]);
        }
        break;
      case "R":
        if (!modifier) {
          this.cubeFaces["U"] = transposedCubeFaces["U"];
          this.cubeFaces["U"][2] = edgeMapping[face]["L"];
          this.cubeFaces["U"] = this.transpose(this.cubeFaces["U"]);

          this.cubeFaces["F"] = transposedCubeFaces["F"];
          this.cubeFaces["F"][2] = edgeMapping[face]["B"];
          this.cubeFaces["F"] = this.transpose(this.cubeFaces["F"]);

          this.cubeFaces["B"] = transposedCubeFaces["B"];
          this.cubeFaces["B"][0] = edgeMapping[face]["T"].reverse();
          this.cubeFaces["B"] = this.transpose(this.cubeFaces["B"]);

          this.cubeFaces["D"] = transposedCubeFaces["D"];
          this.cubeFaces["D"][2] = edgeMapping[face]["R"].reverse();
          this.cubeFaces["D"] = this.transpose(this.cubeFaces["D"]);
        } else if (modifier === "'") {
          this.cubeFaces["U"] = transposedCubeFaces["U"];
          this.cubeFaces["U"][2] = edgeMapping[face]["R"].reverse();
          this.cubeFaces["U"] = this.transpose(this.cubeFaces["U"]);

          this.cubeFaces["F"] = transposedCubeFaces["F"];
          this.cubeFaces["F"][2] = edgeMapping[face]["T"];
          this.cubeFaces["F"] = this.transpose(this.cubeFaces["F"]);

          this.cubeFaces["D"] = transposedCubeFaces["D"];
          this.cubeFaces["D"][2] = edgeMapping[face]["L"];
          this.cubeFaces["D"] = this.transpose(this.cubeFaces["D"]);

          this.cubeFaces["B"] = transposedCubeFaces["B"];
          this.cubeFaces["B"][0] = edgeMapping[face]["B"].reverse();
          this.cubeFaces["B"] = this.transpose(this.cubeFaces["B"]);
        } else if (modifier === "2") {
          this.cubeFaces["U"] = transposedCubeFaces["U"];
          this.cubeFaces["U"][2] = edgeMapping[face]["B"];
          this.cubeFaces["U"] = this.transpose(this.cubeFaces["U"]);

          this.cubeFaces["F"] = transposedCubeFaces["F"];
          this.cubeFaces["F"][2] = edgeMapping[face]["R"].reverse();
          this.cubeFaces["F"] = this.transpose(this.cubeFaces["F"]);

          this.cubeFaces["B"] = transposedCubeFaces["B"];
          this.cubeFaces["B"][0] = edgeMapping[face]["L"].reverse();
          this.cubeFaces["B"] = this.transpose(this.cubeFaces["B"]);

          this.cubeFaces["D"] = transposedCubeFaces["D"];
          this.cubeFaces["D"][2] = edgeMapping[face]["T"];
          this.cubeFaces["D"] = this.transpose(this.cubeFaces["D"]);

        }
        break;
      case "L":
        if (!modifier) {
          this.cubeFaces["U"] = transposedCubeFaces["U"];
          this.cubeFaces["U"][0] = edgeMapping[face]["L"].reverse();
          this.cubeFaces["U"] = this.transpose(this.cubeFaces["U"]);

          this.cubeFaces["F"] = transposedCubeFaces["F"];
          this.cubeFaces["F"][0] = edgeMapping[face]["T"];
          this.cubeFaces["F"] = this.transpose(this.cubeFaces["F"]);

          this.cubeFaces["B"] = transposedCubeFaces["B"];
          this.cubeFaces["B"][2] = edgeMapping[face]["B"].reverse();
          this.cubeFaces["B"] = this.transpose(this.cubeFaces["B"]);

          this.cubeFaces["D"] = transposedCubeFaces["D"];
          this.cubeFaces["D"][0] = edgeMapping[face]["R"];
          this.cubeFaces["D"] = this.transpose(this.cubeFaces["D"]);
        } else if (modifier === "'") {
          this.cubeFaces["U"] = transposedCubeFaces["U"];
          this.cubeFaces["U"][0] = edgeMapping[face]["R"];
          this.cubeFaces["U"] = this.transpose(this.cubeFaces["U"]);

          this.cubeFaces["F"] = transposedCubeFaces["F"];
          this.cubeFaces["F"][0] = edgeMapping[face]["B"];
          this.cubeFaces["F"] = this.transpose(this.cubeFaces["F"]);

          this.cubeFaces["B"] = transposedCubeFaces["B"];
          this.cubeFaces["B"][2] = edgeMapping[face]["T"].reverse();
          this.cubeFaces["B"] = this.transpose(this.cubeFaces["B"]);

          this.cubeFaces["D"] = transposedCubeFaces["D"];
          this.cubeFaces["D"][0] = edgeMapping[face]["L"].reverse();
          this.cubeFaces["D"] = this.transpose(this.cubeFaces["D"]);
        } else if (modifier === "2") {

          this.cubeFaces["U"] = transposedCubeFaces["U"];
          this.cubeFaces["U"][0] = edgeMapping[face]["B"];
          this.cubeFaces["U"] = this.transpose(this.cubeFaces["U"]);

          this.cubeFaces["F"] = transposedCubeFaces["F"];
          this.cubeFaces["F"][0] = edgeMapping[face]["L"].reverse();
          this.cubeFaces["F"] = this.transpose(this.cubeFaces["F"]);

          this.cubeFaces["B"] = transposedCubeFaces["B"];
          this.cubeFaces["B"][2] = edgeMapping[face]["R"].reverse();
          this.cubeFaces["B"] = this.transpose(this.cubeFaces["B"]);

          this.cubeFaces["D"] = transposedCubeFaces["D"];
          this.cubeFaces["D"][0] = edgeMapping[face]["T"];
          this.cubeFaces["D"] = this.transpose(this.cubeFaces["D"]);
        }
    }

  }

  public scramble(moves: string[]) {
    moves.forEach((move) => {
      this.rotateFace(move);
    });
  }

  public static generateScramble(separator: boolean = false, seed: string = ""): string[] {
    let scrambledSeed = seedrandom(seed);
    if (!seed) {
      const currentDate = new Date();
      const dateSeed: string = `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}`;
      scrambledSeed = seedrandom(dateSeed);
    }
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    const scramble = [];
    let lastMove = "";

    for (let i = 0; i < 20; i++) {
      if (i % 5 === 0 && i !== 0 && separator) {
        scramble.push("-");
      }
      let move = moves[Math.floor(scrambledSeed() * moves.length)];
      while (move === lastMove) {
        move = moves[Math.floor(scrambledSeed() * moves.length)];
      }
      lastMove = move;

      const modifier = modifiers[Math.floor(scrambledSeed() * modifiers.length)];
      scramble.push(move + modifier);

    }

    return scramble;
  }
}