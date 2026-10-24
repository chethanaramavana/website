/** Short fictional situations tied to the quantities in the existing pictures.
 * They introduce ideas, not new tests, results or requirements for progress. */
export type BasicsStory={title:string;scene:string;question:string};
const story=(title:string,scene:string,question:string):BasicsStory=>({title,scene,question});
export const basicsStories:Record<string,BasicsStory[]>={
 numbers:[
  story('Asha’s counting adventures','A night sky, a picnic basket and a walk along her street give Asha three ways to think about numbers.','Where does counting begin—and what happens when nothing is left?'),
  story('The school’s pencil store','Asha packs pencils into bundles of ten, then packs ten bundles into a box. She has 2 full boxes, 4 bundles and 6 loose pencils.','Can you count her pencils without opening every bundle?'),
  story('Two places on the path','Dev stops at marker 4 on a walking path. Asha walks on to marker 7. The markers increase by one as they go right.','Who has reached the larger number? How can the picture tell you?'),
 ],
 'addition-subtraction':[
  story('The sticker swap','Asha brings 8 stickers to school. Dev brings 5. They put their collections side by side before deciding whether to join them or compare them.','How many do they have together? How many more does Asha have?'),
  story('New books for the library','The school library has 268 books. A delivery brings 157 more. Asha records the total using hundreds, tens and ones.','What should she do when a column contains ten or more?'),
  story('The library lends its books','There are 502 books on the shelves. After 178 are borrowed, Dev counts what remains. The tens column starts with zero.','How can he exchange a hundred so that he can subtract the ones?'),
 ],
 'multiplication-division':[
  story('Seats for the school show','The class sets out 4 rows of chairs, with 6 chairs in every row. Asha wants the total before the audience arrives.','Must she count every chair, or can the equal rows help?'),
  story('A patchwork for the classroom','Dev makes a rectangular patchwork 13 squares wide and 4 squares high. He splits its width into 10 squares and 3 squares.','Can two smaller rectangles make the multiplication easier?'),
  story('Sharing the craft materials','Four groups are making posters. Asha gives each group 4 counters, arranging them in separate trays.','What does equal sharing look like? What if a few counters are left over?'),
 ],
 estimation:[
  story('Enough cups for the fair?','The class expects 198 visitors. The cups come in packs of 100. Dev needs a sensible planning number before the visitors arrive.','Is 198 closer to 190 or 200? When would an exact count still matter?'),
  story('The sign beside the road','Asha has walked 347 metres. A sign gives distances to the nearest ten metres, so she looks at 340 and 350.','Which distance is nearer, and how far away is it?'),
  story('A quick shopping plan','Dev plans to spend ₹287 on one item and ₹412 on another. Before paying, he makes an estimate using friendlier numbers.','Would about ₹700 be sensible? Why is that an estimate rather than the exact bill?'),
  story('A suspicious bill','The class buys 19 art kits at ₹42 each. A bill reading ₹7,980 makes Asha pause.','How can 20 × 40 help her notice that something is wrong?'),
 ],
 integers:[
  story('A lift with a ground floor','Dev starts at the ground floor, labelled 0. The basement floors are below zero; the upper floors are above it.','How would you describe a floor at −4 and a floor at 2?'),
  story('Five floors up','Asha is at basement level −3. She takes the lift up 5 floors, passing through the ground floor.','Where does she finish? Follow each step on the picture.'),
  story('Following the lift’s pattern','Each downward trip changes a lift’s position by −4 floors. Dev writes the changes for 3 trips, 2 trips, 1 trip and no trips.','What pattern do you notice? What would reversing one downward trip do?'),
 ],
 'operation-order':[
  story('A second helping of stickers','Asha shares 24 stickers equally among 6 children. Then every child receives the same share once more.','For 24 ÷ 6 × 2, which calculation comes first when you read from the left?'),
  story('Packing the art table','Each of 3 packs contains 8 red pens and 2 blue pens. The class uses 4 pens.','Why should we find the pens in one pack before multiplying by 3?'),
 ],
 'factors-multiples':[
  story('Planting eighteen seedlings','The gardening club has 18 seedlings. Dev wants straight rows, with the same number of seedlings in every row and none left over.','Which rectangular arrangements can he make?'),
  story('Two practice schedules','One group practises every 3 days and another every 7 days. Asha marks their practice days on two tracks.','Which numbers appear on both tracks?'),
  story('Fifteen children in rows','For a photograph, 15 children try standing in equal rows. One long row works, but they also find rows of 5.','What do these different arrangements tell you about 15?'),
 ],
 'hcf-lcm':[
  story('A packing puzzle with sixty counters','Asha splits 60 counters into 6 equal groups of 10. Then she keeps breaking the group sizes into smaller factors.','When can she stop splitting a factor?'),
  story('Ribbons for a celebration','Dev has ribbons 24 cm and 36 cm long. He wants the longest equal pieces that leave no ribbon unused.','What length could every piece have?'),
  story('When will the lights meet again?','A blue light flashes every 4 seconds and a gold light every 6 seconds. They flash together at the start.','After how many seconds will they next flash together?'),
 ],
 fractions:[
  story('Sharing a snack fairly','Asha cuts a snack into 8 equal pieces. She puts 3 pieces on Dev’s plate and leaves the other pieces on the tray.','What fraction of the whole snack is on Dev’s plate? Why must the pieces be equal?'),
  story('Two portions on one tray','Dev takes 1/3 of a snack and Asha takes 1/4 of the same-sized snack. They redraw the whole using 12 equal parts.','How many twelfths have they taken altogether?'),
 ],
 decimals:[
  story('Colouring a hundred-square board','Asha has a board with 100 equal squares. She colours 37 of them for a class design.','How can hundredths describe the part she has coloured?'),
  story('Checking the change','Dev buys one item for ₹12.50 and another for ₹7.75. He lines up the rupees and paise before adding.','Why should the decimal points stay in the same column?'),
 ],
 ratio:[
  story('Beads for a bracelet','Asha chooses 3 red beads and 5 blue beads. She wants to describe the colours without losing which colour comes first.','What does a red-to-blue ratio of 3:5 tell you?'),
  story('The identical pens','One pen costs ₹9. Dev lists the prices of 1 pen, 2 pens and 3 pens, all at the same price per pen.','How does the total change when the number of pens doubles?'),
 ],
 percentages:[
  story('A quarter of the class board','Dev colours 25 squares on a board divided into 100 equal squares. Asha says he has coloured one quarter.','How could you say the same thing as a percentage?'),
  story('The sale-price label','A school bag is marked ₹500 with a 20% discount. Asha wants to know the saving before she checks the price to pay.','What is 20 out of every 100 rupees? How does that help with ₹500?'),
 ],
 'powers-roots':[
  story('A square of tiles','Asha lays 5 rows of tiles, with 5 tiles in every row. The finished design is a square.','Why can we write its tile count as 5²?'),
  story('Building a cube','Dev builds a solid cube with 3 small cubes along each edge. Every layer is a 3-by-3 square.','How many small cubes fill it? How does a cube root take you back to the edge length?'),
 ],
 algebra:[
  story('Mystery boxes at the craft table','Asha has 3 identical closed boxes and 2 loose counters. Each box contains the same unknown number of counters.','If one box holds x counters, how could you write the total?'),
  story('Combining the mystery boxes','Dev brings 2 identical boxes. Asha brings 3 more of the same boxes and 3 loose counters.','Why can the box terms be combined while the loose counters stay separate?'),
 ],
 equations:[
  story('The balanced scales','An unknown amount and 5 units balance 12 units on the other side of Asha’s scales. She wants to uncover the unknown amount.','What must she remove from both sides to keep the balance?'),
  story('The notebook bill','Dev buys 3 notebooks at the same price and a cover costing ₹4. His total is ₹25.','What does x represent, and how can the bill become an equation?'),
 ],
 angles:[
  story('Opening the folding fan','Asha opens a fan through a 60° turn. She compares it with a square corner, which is a right angle.','Is the turn smaller or larger than a right angle?'),
  story('A road crosses parallel tracks','Dev draws two parallel tracks crossed by one straight road. He measures an angle of 65° at the first crossing.','Which angle at the other crossing has the matching position?'),
 ],
 shapes:[
  story('A triangular pennant','Asha makes a triangular pennant with angles of 50° and 60° at its lower corners. The top corner still needs a label.','What must the three angles add up to?'),
  story('A rectangular noticeboard','Dev builds a noticeboard 8 units wide and 4 units high. He checks its corners and compares opposite sides.','What properties make his four-sided frame a rectangle?'),
 ],
 symmetry:[
  story('Folding a paper decoration','Asha folds a paper shape along the dashed line. The two halves lie exactly on top of each other.','What would fail to match if the fold were not a line of symmetry?'),
  story('Sharing a strip exactly in half','Dev marks a straight strip AB, 8 cm long. He uses equal compass openings from both ends to locate a halfway line.','Why should points equally far from A and B lie on the perpendicular bisector?'),
 ],
 'area-perimeter':[
  story('The school garden','Asha plans a garden 7 units long and 4 units wide. She needs a fence around its edge and tiles to cover its surface.','Which measurement tells her the fence length, and which tells her the covering?'),
  story('A triangular piece of cloth','Dev cuts a triangular cloth with a 10 cm base and a perpendicular height of 6 cm. He compares it with a rectangle of the same base and height.','Why is the triangle’s area half the rectangle’s area?'),
 ],
 solids:[
  story('Exploring a cube-shaped box','Asha traces the flat faces, joins and corners of a cube-shaped gift box before opening it.','What is the difference between a face, an edge and a vertex?'),
  story('Filling it or wrapping it?','Dev has a cube-shaped box with 5 cm edges. He wants to fill the inside, then wrap the outside with paper.','Why do volume and surface area answer two different questions?'),
 ],
 'data-chance':[
  story('The class book trolley','Asha records 4 returned books on Monday, 7 on Tuesday and 5 on Wednesday. She draws one bar for each day.','What can you compare at a glance before calculating a total or an average?'),
  story('One counter from a bag','Dev puts 3 red counters and 2 blue counters in a bag. He mixes them so that each counter is equally likely to be picked.','How can you describe the chance of picking a red counter?'),
 ],
 'rational-numbers':[
  story('Below the water marker','Asha uses zero as the marker on a water gauge. A drop of three quarters of a unit is recorded as −3/4.','What does three quarters describe, and what extra information does the minus sign give?'),
  story('Two changes in the water level','The water level first changes by −2/3 of a unit, then rises by 5/6 of a unit. Dev wants one number for the overall change.','How can sixths help him combine the two signed fractions?'),
 ],
 'real-numbers':[
  story('Two square floor plans','Dev draws one square with area 49 square units and another with area 50 square units. He tries to write each side length exactly.','Why is one side length a whole number while the other involves an irrational root?'),
  story('Matching pieces in a model','Asha joins a strip of length 3√2 to one of length 4√2. Both are built from the same √2-sized unit.','Why can she combine these lengths? What changes when roots appear in a denominator?'),
 ],
 identities:[
  story('Making the garden bigger','A square garden has side a. Dev extends its length and width by b, splitting the new square into four regions.','Where can you see a², two copies of ab, and b²?'),
  story('Finding a rectangle in an expression','Asha knows the area of a rectangle is x² + 7x + 12. She splits 7x into 3x and 4x to look for matching edges.','Can reversing multiplication reveal two side lengths?'),
 ],
 'coordinate-basics':[
  story('Finding the treasure on a map','Starting at the origin of a grid map, Dev moves 3 units right and then 2 units up. Asha marks his destination.','Why does the order in the pair (3,2) matter?'),
  story('A machine with one extra token','A game machine gives Asha twice her input plus one token. She plots input as x and output as y.','How do (0,1), (1,3) and (2,5) fit the same rule?'),
 ],
 'linear-pairs':[
  story('The two mystery collections','Asha and Dev have 11 counters altogether. Asha has 3 more than Dev. They want to discover each collection without guessing every possibility.','How can both conditions be true at the same time?'),
  story('Two receipts, one answer','Two pens and a notebook cost ₹44. One of the same pens and one of the same notebooks cost ₹32.','What remains when you subtract the second receipt from the first?'),
 ],
 'quadratic-foundations':[
  story('A small rectangular garden','Dev wants a rectangular garden with perimeter 10 units and area 6 square units. He calls one side x, so the other is 5 − x.','How does the area condition become an equation containing x²?'),
  story('Rows of seats for the show','The first row has 5 seats. Each new row has 4 more seats than the row before it. Asha records 5, 9, 13, 17…','Can she find a later row without writing every earlier term?'),
 ],
 'coordinate-distance':[
  story('A shortcut across the park','On a grid map, Dev walks from A(1,1) to B(5,4): 4 units across and 3 up. Asha draws a straight shortcut.','How does a right triangle help you find the shortcut’s length?'),
  story('Meeting halfway','Asha starts at A(−2,1) and Dev at B(6,5) on a grid map. They agree to meet halfway along the straight segment.','Why must their meeting point be halfway in both the horizontal and vertical directions?'),
 ],
 'similarity-trigonometry':[
  story('Enlarging the class pennant','Dev enlarges a right-triangle pennant with sides 3, 4 and 5. Every side of the new pennant is twice as long.','Which lengths become 6, 8 and 10, and which features stay the same?'),
  story('Looking from one corner','Asha looks at a 3–4–5 right triangle from the marked angle θ. She names the opposite side, adjacent side and hypotenuse.','Why must you choose the angle before naming the opposite and adjacent sides?'),
 ],
};
