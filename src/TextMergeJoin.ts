/**
 * In our app we have regions of text that may or not be contiguous.
 *
 * The text is given back as rectangles with x, y, width, and height properties.
 *
 * If the x, y, width, and height are close enough, we can assume they're the same word.
 *
 * Sometimes our rectangles are word fragments NOT the whole word so we need to join the words
 * again to form entire sentences.
 *
 * The test data has examples of what these partial regions would look like.
 */

const DISTANCE_LIMIT = 1;

export namespace TextMergeJoin {

    export interface IPDFTextWord {
        readonly pageNum: number;
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly str: string;
    }

    /**
     *
     */
    export function doMergeWords(data: ReadonlyArray<IPDFTextWord>): ReadonlyArray<IPDFTextWord> {
        // Please, add more explanations to task descriptions
        // It was hard to figure out what has to be done
        
        const result: IPDFTextWord[] = [];
        for (let i = 1; i <= data.length; i++) {
            const previous = data[i - 1];
            const current = data[i]

            if (current && current.x - previous.x - previous.width < DISTANCE_LIMIT) {
                result.push({
                    ...previous,
                    width: previous.width + current.width,
                    str: previous.str + current.str
                });

                i++;
                continue;
            }

            result.push(previous);
        }

        console.log(result)
        return result;
    }

}
