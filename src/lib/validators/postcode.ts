/**
 * @hidden
 */
export const DISTRICT_SPLIT_REGEX = /^([a-z]{1,2}\d)([a-z])$/i;
/**
 * Tests for the unit section of a postcode
 */
export const UNIT_REGEX = /[a-z]{2}$/i;
/**
 * Tests for the inward code section of a postcode
 */
export const INCODE_REGEX = /\d[a-z]{2}$/i;
/**
 * Tests for the outward code section of a postcode
 */
export const OUTCODE_REGEX = /^[a-z]{1,2}\d[a-z\d]?$/i;
/**
 * Tests for a valid postcode
 */
export const POSTCODE_REGEX = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

/**
 * Test for a valid postcode embedded in text
 */
export const POSTCODE_CORPUS_REGEX = /[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}/gi;

/**
 * Tests for the area section of a postcode
 */
export const AREA_REGEX = /^[a-z]{1,2}/i;

/**
 * @hidden
 */
interface Validator {
  (input: string): boolean;
}

/**
 * @hidden
 */
interface Parser {
  /**
   * @hidden
   */
  (postcode: string): string | null;
}

/**
 * Represents a valid postcode
 *
 * Note that results will be normalised (i.e. correctly formatted), including `postcode`
 */
type ValidPostcode = {
  valid: true;
  postcode: string;
  incode: string;
  outcode: string;
  area: string;
  district: string;
  subDistrict: string | null;
  sector: string;
  unit: string;
};

type InvalidPostcode = {
  valid: false;
  postcode: null;
  incode: null;
  outcode: null;
  area: null;
  district: null;
  subDistrict: null;
  sector: null;
  unit: null;
};

/**
 * Invalid postcode prototype
 * @hidden
 */
const invalidPostcode: InvalidPostcode = {
  valid: false,
  postcode: null,
  incode: null,
  outcode: null,
  area: null,
  district: null,
  subDistrict: null,
  sector: null,
  unit: null,
};

/**
 * Return first elem of input is RegExpMatchArray or null if input null
 * @hidden
 */
const firstOrNull = (match: RegExpMatchArray | null): string | null => {
  if (match === null) return null;
  return match[0];
};

const SPACE_REGEX = /\s+/gi;

/**
 * Drop all spaces and uppercase
 * @hidden
 */
const sanitize = (s: string): string =>
  s.replace(SPACE_REGEX, '').toUpperCase();

/**
 * Sanitizes string and returns regex matches
 * @hidden
 */
const matchOn = (s: string, regex: RegExp): RegExpMatchArray | null =>
  sanitize(s).match(regex);

/**
 * Detects a "valid" postcode
 * - Starts and ends on a non-space character
 * - Any length of intervening space is allowed
 * - Must conform to one of following schemas:
 *  - AA1A 1AA
 *  - A1A 1AA
 *  - A1 1AA
 *  - A99 9AA
 *  - AA9 9AA
 *  - AA99 9AA
 */
export const isValid: Validator = (postcode) =>
  postcode.match(POSTCODE_REGEX) !== null;

/**
 * Returns true if string is a valid outcode
 */
export const validOutcode: Validator = (outcode) =>
  outcode.match(OUTCODE_REGEX) !== null;

/**
 * Returns a normalised postcode string (i.e. uppercased and properly spaced)
 *
 * Returns null if invalid postcode
 */
export const toNormalised: Parser = (postcode) => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const incode = toIncode(postcode);
  if (incode === null) return null;
  return `${outcode} ${incode}`;
};

/**
 * Returns a correctly formatted outcode given a postcode
 *
 * Returns null if invalid postcode
 */
export const toOutcode: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  return sanitize(postcode).replace(INCODE_REGEX, '');
};

/**
 * Returns a correctly formatted incode given a postcode
 *
 * Returns null if invalid postcode
 */
export const toIncode: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, INCODE_REGEX);
  return firstOrNull(match);
};

/**
 * Returns a correctly formatted area given a postcode
 *
 * Returns null if invalid postcode
 */
export const toArea: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, AREA_REGEX);
  return firstOrNull(match);
};

/**
 * Returns a correctly formatted sector given a postcode
 *
 * Returns null if invalid postcode
 */
export const toSector: Parser = (postcode) => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const incode = toIncode(postcode);
  if (incode === null) return null;
  return `${outcode} ${incode[0]}`;
};

/**
 * Returns a correctly formatted unit given a postcode
 *
 * Returns null if invalid postcode
 */
export const toUnit: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, UNIT_REGEX);
  return firstOrNull(match);
};

/**
 * Returns a correctly formatted district given a postcode
 *
 * Returns null if invalid postcode
 *
 * @example
 *
 * ```
 * toDistrict("AA9 9AA") // => "AA9"
 * toDistrict("A9A 9AA") // => "A9"
 * ```
 */
export const toDistrict: Parser = (postcode) => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const match = outcode.match(DISTRICT_SPLIT_REGEX);
  if (match === null) return outcode;
  return match[1];
};

/**
 * Returns a correctly formatted subdistrict given a postcode
 *
 * Returns null if no subdistrict is available on valid postcode
 * Returns null if invalid postcode
 *
 * @example
 *
 * ```
 * toSubDistrict("AA9A 9AA") // => "AA9A"
 * toSubDistrict("A9A 9AA") // => "A9A"
 * toSubDistrict("AA9 9AA") // => null
 * toSubDistrict("A9 9AA") // => null
 * ```
 */
export const toSubDistrict: Parser = (postcode) => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const split = outcode.match(DISTRICT_SPLIT_REGEX);
  if (split === null) return null;
  return outcode;
};

/**
 * Returns a ValidPostcode or InvalidPostcode object from a postcode string
 *
 * @example
 *
 * ```
 * import { parse } from "postcode";
 *
 * const {
 * postcode,    // => "SW1A 2AA"
 * outcode,     // => "SW1A"
 * incode,      // => "2AA"
 * area,        // => "SW"
 * district,    // => "SW1"
 * unit,        // => "AA"
 * sector,      // => "SW1A 2"
 * subDistrict, // => "SW1A"
 * valid,       // => true
 * } = parse("Sw1A     2aa");
 *
 * const {
 * postcode,    // => null
 * outcode,     // => null
 * incode,      // => null
 * area,        // => null
 * district,    // => null
 * unit,        // => null
 * sector,      // => null
 * subDistrict, // => null
 * valid,       // => false
 * } = parse("    Oh no, ):   ");
 * ```
 */
export const parse = (postcode: string): ValidPostcode | InvalidPostcode => {
  if (!isValid(postcode)) return { ...invalidPostcode };
  return {
    valid: true,
    postcode: toNormalised(postcode) as string,
    incode: toIncode(postcode) as string,
    outcode: toOutcode(postcode) as string,
    area: toArea(postcode) as string,
    district: toDistrict(postcode) as string,
    subDistrict: toSubDistrict(postcode),
    sector: toSector(postcode) as string,
    unit: toUnit(postcode) as string,
  };
};

/**
 * Searches a body of text for postcode matches
 *
 * Returns an empty array if no match
 *
 * @example
 *
 * ```
 * // Retrieve valid postcodes in a body of text
 * const matches = match("The PM and her no.2 live at SW1A2aa and SW1A 2AB"); // => ["SW1A2aa", "SW1A 2AB"]
 *
 * // Perform transformations like normalisation postcodes using `.map` and `toNormalised`
 * matches.map(toNormalised); // => ["SW1A 2AA", "SW1A 2AB"]
 *
 * // No matches yields empty array
 * match("Some London outward codes are SW1A, NW1 and E1"); // => []
 * ```
 */
export const match = (corpus: string): string[] =>
  corpus.match(POSTCODE_CORPUS_REGEX) || [];

/**
 * @hidden
 */
interface ReplaceResult {
  /**
   * List of matching postcodes found intext
   */
  match: string[];
  /**
   * Body of text with postcodes replaced (with empty string by default)
   */
  result: string;
}

/**
 * Replaces postcodes in a body of text with a string
 *
 * By default the replacement string is empty string `""`
 *
 * @example
 *
 * ```
 * // Replace postcodes in a body of text
 * replace("The PM and her no.2 live at SW1A2AA and SW1A 2AB");
 * // => { match: ["SW1A2AA", "SW1A 2AB"], result: "The PM and her no.2 live at  and " }
 *
 * // Add custom replacement
 * replace("The PM lives at SW1A 2AA", "Downing Street");
 * // => { match: ["SW1A 2AA"], result: "The PM lives at Downing Street" };
 *
 * // No match
 * replace("Some London outward codes are SW1A, NW1 and E1");
 * // => { match: [], result: "Some London outward codes are SW1A, NW1 and E1" }
 * ```
 */
export const replace = (corpus: string, replaceWith = ''): ReplaceResult => ({
  match: match(corpus),
  result: corpus.replace(POSTCODE_CORPUS_REGEX, replaceWith),
});

export const FIXABLE_REGEX =
  /^\s*[a-z01]{1,2}[0-9oi][a-z\d]?\s*[0-9oi][a-z01]{2}\s*$/i;

/**
 * Attempts to fix and clean a postcode. Specifically:
 * - Performs character conversion on obviously wrong and commonly mixed up letters (e.g. O => 0 and vice versa)
 * - Trims string
 * - Properly adds space between outward and inward codes
 *
 * If the postcode cannot be coerced into a valid format, the original string is returned
 *
 * @example
 * ```javascript
 * fix(" SW1A  2AO") => "SW1A 2AO" // Properly spaces
 * fix("SW1A 2A0") => "SW1A 2AO" // 0 is coerced into "0"
 * ```
 *
 * Aims to be used in conjunction with parse to make postcode entry more forgiving:
 *
 * @example
 * ```javascript
 * const { inward } = parse(fix("SW1A 2A0")); // inward = "2AO"
 * ```
 */
export const fix = (s: string): string => {
  const match = s.match(FIXABLE_REGEX);
  if (match === null) return s;
  s = s.toUpperCase().trim().replace(/\s+/gi, '');
  const l = s.length;
  const inward = s.slice(l - 3, l);
  return `${coerceOutcode(s.slice(0, l - 3))} ${coerce('NLL', inward)}`;
};

const toLetter: Record<string, string> = {
  '0': 'O',
  '1': 'I',
};

const toNumber: Record<string, string> = {
  O: '0',
  I: '1',
};

const coerceOutcode = (i: string): string => {
  if (i.length === 2) return coerce('LN', i);
  if (i.length === 3) return coerce('L??', i);
  if (i.length === 4) return coerce('LLN?', i);
  return i;
};

/**
 * Given a pattern of letters, numbers and unknowns represented as a sequence
 * of L, Ns and ? respectively; coerce them into the correct type given a
 * mapping of potentially confused letters
 *
 * @hidden
 *
 * @example coerce("LLN", "0O8") => "OO8"
 */
const coerce = (pattern: string, input: string): string =>
  input
    .split('')
    .reduce<string[]>((acc, c, i) => {
      const target = pattern.charAt(i);
      if (target === 'N') acc.push(toNumber[c] || c);
      if (target === 'L') acc.push(toLetter[c] || c);
      if (target === '?') acc.push(c);
      return acc;
    }, [])
    .join('');
