const n=`## DES (Data Encryption Standard) Algorithm Explained Step by Step

DES (Data Encryption Standard) is a block cipher algorithm now obsolete in its classic version. Although theoretically its TripleDES version is "secure", its use is not recommended since there are more secure and faster alternatives. Still, it's worth knowing how it works. The TripleDES version simply encrypts the message 3 times with DES.

### Initial Key Setup

In DES symmetric block cipher, a 64-character key is used as input.

For example, the key in ASCII/UTF-8 (abcdefgh). Each character in this key is represented using 1 byte (8 bits).

\`\`\`
ASCII → abcdefgh
Binary → 01100001 01100010 01100011 01100100 01100101 01100110 01100111 01101000
Sequence → 0110000101100010011000110110010001100101011001100110011101101000
\`\`\`

**Code example to convert text to binary:**

\`\`\`javascript
/* Example code to convert text to binary */
const text = "abcdefgh";
let end = "";
for (let i in text) {
  let aux = text[i].charCodeAt(0).toString(2)
  if (aux.length < 8) {
    aux = "0".repeat(8 - aux.length) + aux;
  }
  end += aux + " ";
}
console.log(end);
\`\`\`

The DES algorithm ignores one bit per byte of the key. It's believed this was an NSA strategy to be able to break the cipher before anyone else. So the actual key size used internally is 56 bits even though the input requires 64 bits.

### Permutation Tables (PC)

The DES algorithm uses predefined tables repeatedly to perform permutations. They're known as PC (Permuted Choice).

The first DES permutation table is as follows (PC-1):

\`\`\`
57, 49, 41, 33, 25, 17, 9,
1, 58, 50, 42, 34, 26, 18,
10, 2, 59, 51, 43, 35, 27,
19, 11, 3, 60, 52, 44, 36,
63, 55, 47, 39, 31, 23, 15,
7, 62, 54, 46, 38, 30, 22,
14, 6, 61, 53, 45, 37, 29,
21, 13, 5, 28, 20, 12, 4
\`\`\`

This table indicates the position we should choose from our key to generate the permuted 56-bit key from the 64-bit one.

Our binary is:
\`\`\`
0110000101100010011000110110010001100101011001100110011101101000
\`\`\`

We're going to choose the bit at position 57, then the one at position 49 and so on until we finish the entire table.

**Permutations:**

\`\`\`
57 -> 0    1  -> 0    10 -> 1    19 -> 1
49 -> 0    58 -> 1    2  -> 1    11 -> 1
41 -> 0    50 -> 1    59 -> 1    3  -> 1
33 -> 0    42 -> 1    51 -> 1    60 -> 0
25 -> 0    34 -> 1    43 -> 1    52 -> 0
17 -> 0    26 -> 1    35 -> 1    44 -> 0
9  -> 0    18 -> 1    27 -> 1    36 -> 0

63 -> 0    7  -> 0    14 -> 0    21 -> 0
55 -> 1    62 -> 0    6  -> 0    13 -> 0
47 -> 1    54 -> 1    61 -> 1    5  -> 0
39 -> 0    46 -> 1    53 -> 0    28 -> 0
31 -> 0    38 -> 1    45 -> 0    20 -> 0
23 -> 1    30 -> 1    37 -> 0    12 -> 0
15 -> 1    22 -> 0    29 -> 0    4  -> 0
\`\`\`

And here we have our permuted 56-bit key with PC-1:

\`\`\`
0000000
0111111
1111111
1110000
0110011
0011110
0010000
0000000
\`\`\`

### Key Splitting and Rotation

The next step is to divide the key in half into 2 chunks of 28 bits each:

\`\`\`
0000000
0111111
1111111
1110000

0110011
0011110
0010000
0000000
\`\`\`

The next step is to apply a left bit shift operation to each of the chunks to create 2 groups formed by 16 sequences of shifted bits.

The left bit shift operation is performed by moving each bit to the left, passing the one in the first position to the very end. For example, if we have the bit sequence 1101:

\`\`\`
0° -> 1101
1° -> 1011
2° -> 0111
3° -> 1110
4° ...
5° ...
\`\`\`

Not all iterations have the same amount of bit shift. The number of bits per iteration that we need to shift left is as follows:

**Bits shifted per iteration:**

\`\`\`
1°  -> 1 bit    9°  -> 1 bit
2°  -> 1 bit    10° -> 2 bits
3°  -> 2 bits   11° -> 2 bits
4°  -> 2 bits   12° -> 2 bits
5°  -> 2 bits   13° -> 2 bits
6°  -> 2 bits   14° -> 2 bits
7°  -> 2 bits   15° -> 2 bits
8°  -> 2 bits   16° -> 1 bit
\`\`\`

**Result - Group 1 (First 28-bit half):**

\`\`\`
0°  -> 0000000011111111111111110000
1°  -> 0000000111111111111111100000
2°  -> 0000001111111111111111000000
3°  -> 0000111111111111111100000000
4°  -> 0011111111111111110000000000
5°  -> 1111111111111111000000000000
6°  -> 1111111111111100000000000011
7°  -> 1111111111110000000000001111
8°  -> 1111111111000000000000111111
9°  -> 1111111110000000000001111111
10° -> 1111111000000000000111111111
11° -> 1111100000000000011111111111
12° -> 1110000000000001111111111111
13° -> 1000000000000111111111111111
14° -> 0000000000011111111111111110
15° -> 0000000001111111111111111000
16° -> 0000000011111111111111110000
\`\`\`

**Result - Group 2 (Second 28-bit half):**

\`\`\`
0°  -> 0110011001111000100000000000
1°  -> 1100110011110001000000000000
2°  -> 1001100111100010000000000001
3°  -> 0110011110001000000000000110
4°  -> 1001111000100000000000011001
5°  -> 0111100010000000000001100110
6°  -> 1110001000000000000110011001
7°  -> 1000100000000000011001100111
8°  -> 0010000000000001100110011110
9°  -> 0100000000000011001100111100
10° -> 0000000000001100110011110001
11° -> 0000000000110011001111000100
12° -> 0000000011001100111100010000
13° -> 0000001100110011110001000000
14° -> 0000110011001111000100000000
15° -> 0011001100111100010000000000
16° -> 0110011001111000100000000000
\`\`\`

### Generating 16 Subkeys with PC-2

The next step is to group them together:

**Grouped sequences:**

\`\`\`
1°  -> 0000000111111111111111100000 1100110011110001000000000000
2°  -> 0000001111111111111111000000 1001100111100010000000000001
3°  -> 0000111111111111111100000000 0110011110001000000000000110
4°  -> 0011111111111111110000000000 1001111000100000000000011001
5°  -> 1111111111111111000000000000 0111100010000000000001100110
6°  -> 1111111111111100000000000011 1110001000000000000110011001
7°  -> 1111111111110000000000001111 1000100000000000011001100111
8°  -> 1111111111000000000000111111 0010000000000001100110011110
9°  -> 1111111110000000000001111111 0100000000000011001100111100
10° -> 1111111000000000000111111111 0000000000001100110011110001
11° -> 1111100000000000011111111111 0000000000110011001111000100
12° -> 1110000000000001111111111111 0000000011001100111100010000
13° -> 1000000000000111111111111111 0000001100110011110001000000
14° -> 0000000000011111111111111110 0000110011001111000100000000
15° -> 0000000001111111111111111000 0011001100111100010000000000
16° -> 0000000011111111111111110000 0110011001111000100000000000
\`\`\`

And apply another permutation with a new table (PC-2) to obtain 48 bits from these 56 we have.

The PC-2 table is:

\`\`\`
14, 17, 11, 24, 1, 5,
3, 28, 15, 6, 21, 10,
23, 19, 12, 4, 26, 8,
16, 7, 27, 20, 13, 2,
41, 52, 31, 37, 47, 55,
30, 40, 51, 45, 33, 48,
44, 49, 39, 56, 34, 53,
46, 42, 50, 36, 29, 32
\`\`\`

This table must be applied to each of the 16 groups to obtain a total of 16 keys of 48 bits each. It's done the same way as the first permutation shown earlier with the PC-1 table.

For iteration 1:

\`\`\`
00000001111111111111111000001100110011110001000000000000
\`\`\`

**Permutations example:**

\`\`\`
14 -> 1    23 -> 1    41 -> 0    44 -> 1
17 -> 1    19 -> 1    52 -> 0    49 -> 0
11 -> 1    12 -> 1    31 -> 0    39 -> 1
24 -> 0    4  -> 0    37 -> 1    56 -> 0
1  -> 0    26 -> 0    47 -> 0    34 -> 1
5  -> 0    8  -> 1    55 -> 0    53 -> 0

3  -> 0    16 -> 1    30 -> 1    46 -> 0
28 -> 0    7  -> 0    40 -> 1    42 -> 0
15 -> 1    27 -> 0    51 -> 0    50 -> 0
6  -> 0    20 -> 1    45 -> 0    36 -> 0
21 -> 1    13 -> 1    33 -> 1    29 -> 1
10 -> 1    2  -> 0    48 -> 0    32 -> 0
\`\`\`

Result for iteration 1:
\`\`\`
111000001011111001100110000100110010101010000010
\`\`\`

**Code to calculate PC-2 permutation:**

\`\`\`javascript
/* PC to binary */
const pc = (bin, table) => {
  let result = "";
  for(let i = 0; i < table.length; ++i) {
    result += bin[table[i] - 1];
  }
  return result;
}

const BIN = "00000001111111111111111000001100110011110001000000000000";
const DES_PC2 = [
  14, 17, 11, 24, 1, 5,
  3, 28, 15, 6, 21, 10,
  23, 19, 12, 4, 26, 8,
  16, 7, 27, 20, 13, 2,
  41, 52, 31, 37, 47, 55,
  30, 40, 51, 45, 33, 48,
  44, 49, 39, 56, 34, 53,
  46, 42, 50, 36, 29, 32
];

const res = pc(BIN, DES_PC2);
console.log(res);
\`\`\`

**Code to calculate all 16 sequences with PC-2:**

\`\`\`javascript
/* Calculates the 16 sequences with PC-2 */
const BINS = [
  "00000001111111111111111000001100110011110001000000000000",
  "00000011111111111111110000001001100111100010000000000001",
  "00001111111111111111000000000110011110001000000000000110",
  "00111111111111111100000000001001111000100000000000011001",
  "11111111111111110000000000000111100010000000000001100110",
  "11111111111111000000000000111110001000000000000110011001",
  "11111111111100000000000011111000100000000000011001100111",
  "11111111110000000000001111110010000000000001100110011110",
  "11111111100000000000011111110100000000000011001100111100",
  "11111110000000000001111111110000000000001100110011110001",
  "11111000000000000111111111110000000000110011001111000100",
  "11100000000000011111111111110000000011001100111100010000",
  "10000000000001111111111111110000001100110011110001000000",
  "00000000000111111111111111100000110011001111000100000000",
  "00000000011111111111111110000011001100111100010000000000",
  "00000000111111111111111100000110011001111000100000000000"
];

for (let i in BINS) {
  console.log( pc(BINS[i], DES_PC2) )
}
\`\`\`

**Result - All 16 subkeys (48 bits each):**

\`\`\`
1°  -> 111000001011111001100110000100110010101010000010
2°  -> 111000001011011001110110000100000010001100000111
3°  -> 111001001101011001110110101101100000000010000100
4°  -> 111001101101001101110010010000000010001111000011
5°  -> 101011101101001101110011001101101010000000001001
6°  -> 101011110101001101011011011000100001010101000010
7°  -> 001011110101001111011001000011001010000100101010
8°  -> 000111110101100111011001011001000101110001000000
9°  -> 000111110100100111011001010010101001100001000000
10° -> 000111110110100110011101110000001100010100111000
11° -> 000111110010110110001101000010010001111000001000
12° -> 010110110010110010101101110110000101000000110000
13° -> 110110011010110010101100000000010100101000101100
14° -> 110100001010111010101110100100000011100010010000
15° -> 111100001011111000100110101000010000001000110101
16° -> 111100001011111000100110101000110100001010000000
\`\`\`

### Message Encryption Process

In DES, the message you want to encrypt must be divided into 64-bit blocks.

For the message, we must perform an initial permutation with a new IP table (Initial Permutation):

\`\`\`
58, 50, 42, 34, 26, 18, 10, 2,
60, 52, 44, 36, 28, 20, 12, 4,
62, 54, 46, 38, 30, 22, 14, 6,
64, 56, 48, 40, 32, 24, 16, 8,
57, 49, 41, 33, 25, 17, 9, 1,
59, 51, 43, 35, 27, 19, 11, 3,
61, 53, 45, 37, 29, 21, 13, 5,
63, 55, 47, 39, 31, 23, 15, 7
\`\`\`

I'll use the message "hello world" as an example:

\`\`\`
h -> 01101000
e -> 01100101
l -> 01101100
l -> 01101100
o -> 01101111
  -> 00100000
w -> 01110111
o -> 01101111
r -> 01110010
l -> 01101100
d -> 01100100
\`\`\`

In 64-bit blocks:

\`\`\`
0110100001100101011011000110110001101111001000000111011101101111
011100100110110001100100
\`\`\`

Here we have one 64-bit block and another of 24 bits. To avoid complicating the process with padding, I'll fill the rest of the block with zeros until reaching 64 bits:

\`\`\`
0110100001100101011011000110110001101111001000000111011101101111
0111001001101100011001000000000000000000000000000000000000000000
\`\`\`

Now the initial permutation table (IP) is applied to each block:

\`\`\`
B1 -> 1101111101000000110111101101001000000000111111111001110111010000
B2 -> 0000011100000001000001100000000000000000000001110000001000000001
\`\`\`

### Block Splitting and Round Function

Now each block is divided in half (32 bits):

\`\`\`
L -> 11011111010000001101111011010010
R -> 00000000111111111001110111010000
\`\`\`

(We'll ignore the second block, because there are different ways to combine blocks, which is no longer within what the DES algorithm itself is and would need its own entry)

\`\`\`
L -> 00000111000000010000011000000000
R -> 00000000000001110000001000000001
\`\`\`

The next step is to use a function that takes as inputs a 48-bit key and a 32-bit text, to generate a 32-bit output.

We'll use the 16 48-bit keys we computed in the previous steps and the 32-bit chunks we just made by splitting the message in 2. We need to apply the 16 keys to each half using a function.

**The keys we already had:**

\`\`\`
1°  -> 111000001011111001100110000100110010101010000010
2°  -> 111000001011011001110110000100000010001100000111
3°  -> 111001001101011001110110101101100000000010000100
4°  -> 111001101101001101110010010000000010001111000011
5°  -> 101011101101001101110011001101101010000000001001
6°  -> 101011110101001101011011011000100001010101000010
7°  -> 001011110101001111011001000011001010000100101010
8°  -> 000111110101100111011001011001000101110001000000
9°  -> 000111110100100111011001010010101001100001000000
10° -> 000111110110100110011101110000001100010100111000
11° -> 000111110010110110001101000010010001111000001000
12° -> 010110110010110010101101110110000101000000110000
13° -> 110110011010110010101100000000010100101000101100
14° -> 110100001010111010101110100100000011100010010000
15° -> 111100001011111000100110101000010000001000110101
16° -> 111100001011111000100110101000110100001010000000
\`\`\`

**The algorithm we need to use is:**

\`\`\`
L[n] = R[n - 1]
R[n] = L[n - 1] XOR F(R[n - 1], K[n])

Where:
L is the left chunk of the recently permuted block
R is the right chunk of the recently permuted block
XOR is a bit operation (Exclusive Disjunction)
F is a function with multiple steps that will be detailed shortly
K is the key
n is the iteration/round
\`\`\`

**Algorithm for n = 1 (the first time you apply the algorithm):**

\`\`\`
n = 1;
L[1] = R[0];
R[1] = L[0] XOR F(R[0], K[1]);
\`\`\`

\`\`\`
n = 1:
R[0] = 00000000111111111001110111010000;
L[1] = R[0]
R[1] = 11011111010000001101111011010010 + F(00000000111111111001110111010000, 111000001011111001100110000100110010101010000010)
\`\`\`

### The F Function

Now we're going to start with the F function.

The F function uses a permutation table (E) to expand R[n - 1] from 32 bits to 48 bits.

**E table:**

\`\`\`
32, 1, 2, 3, 4, 5,
4, 5, 6, 7, 8, 9,
8, 9, 10, 11, 12, 13,
12, 13, 14, 15, 16, 17,
16, 17, 18, 19, 20, 21,
20, 21, 22, 23, 24, 25,
24, 25, 26, 27, 28, 29,
28, 29, 30, 31, 32, 1
\`\`\`

In this first round, R[0] is \`00000000111111111001110111010000\`

After expanding R[0] using table (E) to perform the permutation, we obtain:

\`\`\`
000000000001011111111111110011111011111010100000
\`\`\`

The next step of the function is to perform an XOR between expanded R[0] and K[1] (the first key):

\`\`\`
000000000001011111111111110011111011111010100000 XOR
111000001011111001100110000100110010101010000010
→
111000001010100110011001110111001001010000100010
\`\`\`

### S-Boxes (Substitution Boxes)

The next step of F includes the use of S-Boxes (substitution boxes).

First, we need to divide the result of the XORed key with the expanded half of the permuted message into groups of 6 bits:

\`\`\`
111000 001010 100110 011001 110111 001001 010000 100010
\`\`\`

**The first S-Box (S1) is:**

\`\`\`
14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
\`\`\`

The S-Box is like a coordinate map. You need to choose the first and last bit of each 6-bit group to obtain the column, and the remaining bits (in the middle) are used to choose the row.

In the case of \`111000\`:

\`\`\`
First and last bit → 10
Middle bits → 1100
\`\`\`

We convert them to decimal:

\`\`\`
10 → 2
1100 → 12
\`\`\`

And now we use these 2 numbers as a guide to obtain the thirteenth number of the third column (columns and rows start counting at 0).

The number we get is 3.

\`\`\`
3 → 0011
\`\`\`

That is, using the S-Box with \`111000\` as input, we get \`0011\` as output.

Now we need to repeat the same for the rest of the 6-bit groups, BUT we need to use a different S-Box for each group.

**The 8 S-Boxes (one for each 6-bit group):**

\`\`\`
S1:
14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13

S2:
15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9

S3:
10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12

S4:
7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14

S5:
2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3

S6:
12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13

S7:
4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12

S8:
13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
\`\`\`

**Code to process all groups with S-Boxes:**

\`\`\`javascript
const transformSboxes = (groups, sboxes) => {
  const ret = [];
  for (let i in groups) {
    const column = parseInt(groups[i][0] + groups[i][5], 2);
    const field = parseInt(groups[i].substring(1, 5), 2);
    let res = sboxes[i][column][field].toString(2);
    if (res.length < 4) {
      res = "0".repeat(4 - res.length) + res;
    }
    ret.push(res);
  }
  return ret;
}

const groups = [
  "111000",
  "001010",
  "100110",
  "011001",
  "110111",
  "001001",
  "010000",
  "100010"
]

const sBox = [
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
  ],
  // ... (remaining S-boxes as shown above)
];

const res = transformSboxes(groups, sBox);
console.log(res);
\`\`\`

**Result:**

\`\`\`
0011 1011 1001 0001 1001 0111 0011 1011
\`\`\`

So far we have:

\`\`\`
R[1] = 11011111010000001101111011010010 XOR F(0011 1011 1001 0001 1001 0111 0011 1011)
\`\`\`

### Final Permutation P

The last step of the function is another permutation:

**P table:**

\`\`\`
16, 7, 20, 21,
29, 12, 28, 17,
1, 15, 23, 26,
5, 18, 31, 10,
2, 8, 24, 14,
32, 27, 3, 9,
19, 13, 30, 6,
22, 11, 4, 25
\`\`\`

The result of F is:

\`\`\`
11101111001010100110111100001010
\`\`\`

Now we need to XOR L[0] and the result of F to obtain R[1]:

\`\`\`
R[1] = 11011111010000001101111011010010 XOR 11101111001010100110111100001010
R[1] → 00110000011010101011000111011000
\`\`\`

We have finished the first round for n = 1. Remember:

**Algorithm for n = 1:**

\`\`\`
n = 1
L[1] = R[0]
R[1] = L[0] XOR F(R[0], K[1])
\`\`\`

Now we need to perform the same steps for n = 2:

**Algorithm for n = 2:**

\`\`\`
n = 2
L[2] = R[1]
R[2] = L[1] XOR F(R[1], K[2])
\`\`\`

When you finish all rounds (16), you'll have L[16] and R[16] (32 bits each).

You just need to reverse the order. Example: If L[16] is \`00110000011010101011000111011000\` and R[16] is \`10110000011010101011000111011001\`, you'll have:

\`\`\`
1011000001101010101100011101100100110000011010101011000111011000
\`\`\`

### Final Inverse Permutation

And apply the final permutation:

**P-1 (Inverse Permutation) table:**

\`\`\`
40, 8, 48, 16, 56, 24, 64, 32,
39, 7, 47, 15, 55, 23, 63, 31,
38, 6, 46, 14, 54, 22, 62, 30,
37, 5, 45, 13, 53, 21, 61, 29,
36, 4, 44, 12, 52, 20, 60, 28,
35, 3, 43, 11, 51, 19, 59, 27,
34, 2, 42, 10, 50, 18, 58, 26,
33, 1, 41, 9, 49, 17, 57, 25
\`\`\`

The result is your message encrypted with DES.

### Decryption

To decrypt, it's exactly the same process.
`;export{n as default};
