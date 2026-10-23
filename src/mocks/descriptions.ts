/**
 * Demo product descriptions (Magento `description.html`), written the way the client's admin content is:
 * intro, Features list, detail heading with image + copy, How To Use steps, Ingredients. Delete with `src/mocks/`.
 */
const img = (slug: string) => `/assets/images/mock/products/${slug}.jpg`;

export const MOCK_DESCRIPTIONS: Record<string, string> = {
  "cerave-moisturising-lotion-for-dry-to-very-dry-skin-236ml": `
<p>CeraVe Moisturising Lotion is a lightweight, oil-free moisturiser for dry to very dry skin on the face and body. Developed with dermatologists, it combines three essential ceramides with hyaluronic acid to restore the skin barrier and lock in moisture for 24 hours.</p>
<h3>Features</h3>
<ul>
  <li>24-hour hydration with patented MVE Technology</li>
  <li>Three essential ceramides (1, 3, 6-II) restore the skin barrier</li>
  <li>Hyaluronic acid helps retain the skin's natural moisture</li>
  <li>Lightweight, non-greasy and fast absorbing</li>
  <li>Non-comedogenic, won't clog pores</li>
  <li>Fragrance-free and suitable for sensitive skin</li>
  <li>Developed with dermatologists</li>
  <li>Suitable for face and body</li>
</ul>
<h3>Why CeraVe Moisturising Lotion</h3>
<img src="${img("cerave-moisturising-lotion-for-dry-to-very-dry-skin-236ml")}" alt="CeraVe Moisturising Lotion 236ml">
<p>The formula releases moisturising ingredients gradually through the day, so skin stays comfortable long after application. Ceramides are a natural part of the skin barrier; replenishing them helps dry, tight skin feel soft and smooth again.</p>
<p>Hypoallergenic and fragrance-free, it is gentle enough for daily use, including on sensitive skin, and works well under makeup or sunscreen.</p>
<h3>How To Use</h3>
<ol>
  <li>Cleanse and gently pat skin dry after a shower or face wash.</li>
  <li>Take a small amount of lotion into the palm of your hand.</li>
  <li>Massage into face and body in gentle circular motions until absorbed. Use daily, as often as needed.</li>
</ol>
<h3>Ingredients</h3>
<p>Aqua/Water, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Cetyl Alcohol, Potassium Phosphate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Dimethicone, Ceteareth-20, Behentrimonium Methosulfate, Methylparaben, Sodium Lauroyl Lactylate, Cholesterol, Disodium EDTA, Dipotassium Phosphate, Propylparaben, Hydrolyzed Hyaluronic Acid, Phytosphingosine, Xanthan Gum, Polysorbate 20, Polyglyceryl-3 Diisostearate.</p>
<h3>Good To Know</h3>
<ul>
  <li>For external use only. Avoid contact with eyes.</li>
  <li>Store below 30°C, away from direct sunlight.</li>
  <li>Imported from the USA. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,

  "simple-kind-to-skin-hydrating-light-moisturiser-125ml": `
<p>Simple Kind To Skin Hydrating Light Moisturiser gives instant and lasting hydration with a light, non-greasy texture. Made with skin-loving ingredients and no harsh chemicals, perfume or colour that can upset your skin.</p>
<h3>Features</h3>
<ul>
  <li>Instant and long-lasting hydration</li>
  <li>Pro-Vitamin B5 and Vitamin E to nourish skin</li>
  <li>Light texture absorbs quickly</li>
  <li>No perfume, no colour, no harsh chemicals</li>
  <li>Dermatologically tested for sensitive skin</li>
  <li>Suitable for daily use, morning and night</li>
</ul>
<h3>How To Use</h3>
<ol>
  <li>Cleanse your face with a gentle Simple facial wash.</li>
  <li>Dot a small amount onto forehead, cheeks and chin.</li>
  <li>Smooth over face and neck with upward strokes, avoiding the eye area.</li>
</ol>
<h3>Ingredients</h3>
<p>Aqua, Glycerin, Isopropyl Palmitate, Cetearyl Alcohol, Panthenol, Tocopheryl Acetate, Bisabolol, Allantoin, Glyceryl Stearate, Ceteareth-20, Dimethicone, Carbomer, Sodium Hydroxide, Phenoxyethanol, Ethylhexylglycerin.</p>`,

  "aveeno-baby-daily-care-baby-moisturising-lotion-150ml": `
<p>Aveeno Baby Daily Care Moisturising Lotion is specially formulated for delicate baby skin. Enriched with natural colloidal oatmeal, it locks in moisture for 24 hours and leaves skin feeling soft, smooth and healthy.</p>
<h3>Features</h3>
<ul>
  <li>Natural colloidal oatmeal soothes and protects</li>
  <li>24-hour moisture for delicate skin</li>
  <li>Fragrance-free and paraben-free</li>
  <li>Hypoallergenic, paediatrician recommended</li>
  <li>Absorbs quickly, non-greasy</li>
</ul>
<h3>How To Use</h3>
<ol>
  <li>After bath time, pat your baby's skin dry with a soft towel.</li>
  <li>Warm a little lotion between your palms.</li>
  <li>Gently massage over your baby's body. Use daily or as needed.</li>
</ol>`,

  "technic-mega-glow-highlighter-10gm": `
<p>Technic Mega Glow Highlighter delivers a buildable, light-reflecting glow in four wearable shades. The silky pressed powder blends seamlessly for a soft sheen or an intense, glass-like highlight.</p>
<h3>Features</h3>
<ul>
  <li>Four complementary highlighting shades in one palette</li>
  <li>Buildable from subtle to intense glow</li>
  <li>Silky texture that blends without patchiness</li>
  <li>Long-wearing finish</li>
  <li>Cruelty-free</li>
</ul>
<h3>How To Use</h3>
<ol>
  <li>Sweep a fan or small tapered brush across your chosen shade.</li>
  <li>Apply to the high points of the face: cheekbones, brow bone, nose bridge and cupid's bow.</li>
  <li>Build up layers for a more intense glow, or mix shades for a custom tone.</li>
</ol>`,

  "absolute-new-york-matte-lipstick": `
<p>Absolute New York Supreme Slim Demi Matte Lipstick delivers saturated, rich colour with a comfortable demi-matte finish. The slim bullet glides on smoothly for precise application and weightless, all-day wear.</p>
<h3>Features</h3>
<ul>
  <li>High-pigment colour with full coverage in one swipe</li>
  <li>Demi-matte finish that never feels dry</li>
  <li>Slim bullet for precise lines without a liner</li>
  <li>Hydrating formula, no feathering or bleeding</li>
  <li>Long-lasting, transfer-resistant wear</li>
  <li>Cruelty-free and paraben-free</li>
</ul>
<h3>How To Use</h3>
<ol>
  <li>Start with clean, moisturised lips.</li>
  <li>Outline the lips using the slim tip, starting from the centre of the upper lip.</li>
  <li>Fill in the rest of the lips and press together. Reapply as needed.</li>
</ol>
<h3>Good To Know</h3>
<ul>
  <li>Shade: Night Shade (MLSS60), 1.3 g.</li>
  <li>Imported from the USA. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,

  "cetaphil-moisturising-cream-dry-to-normal-sensitive-skin-05-80-g": `
<p>Cetaphil Moisturising Cream is a rich, non-greasy cream that instantly soothes and deeply hydrates dry, sensitive skin. Its fragrance-free formula restores the skin's moisture barrier and keeps skin soft and supple all day.</p>
<h3>Features</h3>
<ul>
  <li>Intense, long-lasting hydration for dry skin</li>
  <li>Sweet almond oil and vitamin E nourish and protect</li>
  <li>Strengthens the natural moisture barrier</li>
  <li>Fragrance-free and non-comedogenic</li>
  <li>Dermatologist recommended for sensitive skin</li>
  <li>Suitable for face and body</li>
</ul>
<h3>Why Cetaphil Moisturising Cream</h3>
<img src="${img("cetaphil-moisturising-cream-dry-to-normal-sensitive-skin-05-80-g")}" alt="Cetaphil Moisturising Cream 80g">
<p>Developed for sensitive skin, the rich texture melts in without leaving a heavy film, so it works as an everyday face cream and an all-over body moisturiser.</p>
<p>The gentle, clinically proven formula is free from fragrance and harsh ingredients, making it a trusted choice for dry, itchy or easily irritated skin.</p>
<h3>How To Use</h3>
<ol>
  <li>Cleanse skin with a gentle cleanser and pat dry.</li>
  <li>Take a small amount of cream onto your fingertips.</li>
  <li>Massage evenly into face and body. Reapply as often as needed.</li>
</ol>
<h3>Ingredients</h3>
<p>Aqua, Glycerin, Petrolatum, Dicaprylyl Ether, Dimethicone, Glyceryl Stearate, Cetyl Alcohol, Prunus Amygdalus Dulcis Oil, PEG-30 Stearate, Tocopheryl Acetate, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Dimethiconol, Benzyl Alcohol, Phenoxyethanol, Glyceryl Acrylate/Acrylic Acid Copolymer, Propylene Glycol, Disodium EDTA, Sodium Hydroxide.</p>
<h3>Good To Know</h3>
<ul>
  <li>For external use only. Avoid contact with eyes.</li>
  <li>Imported from Canada. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,

  "neutrogena-hydro-boost-water-gel-for-normal-to-combination-skin-50ml-1": `
<p>Neutrogena Hydro Boost Water Gel quenches dry skin with a burst of lightweight hydration. The oil-free gel absorbs instantly like water but has the long-lasting, intense moisturising power of a cream.</p>
<h3>Features</h3>
<ul>
  <li>Hyaluronic acid draws moisture into the skin</li>
  <li>Refreshing water-gel texture absorbs instantly</li>
  <li>Oil-free, non-comedogenic, won't clog pores</li>
  <li>Smooth, supple skin all day</li>
  <li>Works well under makeup</li>
</ul>
<h3>Why Neutrogena Hydro Boost</h3>
<img src="${img("neutrogena-hydro-boost-water-gel-for-normal-to-combination-skin-50ml-1")}" alt="Neutrogena Hydro Boost Water Gel 50ml">
<p>Hyaluronic acid can hold many times its weight in water, so a thin layer keeps normal to combination skin plump and hydrated without any greasy shine.</p>
<p>The cooling gel is ideal for warm, humid weather and fits easily into a morning routine before sunscreen and makeup.</p>
<h3>How To Use</h3>
<ol>
  <li>Cleanse and tone your face as usual.</li>
  <li>Smooth a small amount evenly over face and neck.</li>
  <li>Use morning and night. Follow with sunscreen during the day.</li>
</ol>
<h3>Good To Know</h3>
<ul>
  <li>Best for normal to combination skin.</li>
  <li>Imported from the USA. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,

  "tresemme-pro-collection-keratin-smooth-shampoo-with-marula-oil-700ml": `
<p>TRESemmé Keratin Smooth Shampoo with Marula Oil tames frizz and leaves hair visibly smoother and shinier for up to 72 hours. A salon-quality formula for manageable, glossy hair every day.</p>
<h3>Features</h3>
<ul>
  <li>Up to 72 hours of frizz control</li>
  <li>Keratin protein and marula oil smooth the hair surface</li>
  <li>Adds glossy, salon-like shine</li>
  <li>Makes hair easier to detangle and style</li>
  <li>Value 700ml pack</li>
</ul>
<h3>Why TRESemmé Keratin Smooth</h3>
<img src="${img("tresemme-pro-collection-keratin-smooth-shampoo-with-marula-oil-700ml")}" alt="TRESemmé Keratin Smooth Shampoo 700ml">
<p>Humidity lifts the hair cuticle and causes frizz. The keratin-infused formula helps seal the cuticle so hair stays smooth and controlled from wash day to wash day.</p>
<p>For best results, pair it with the TRESemmé Keratin Smooth Conditioner.</p>
<h3>How To Use</h3>
<ol>
  <li>Wet hair thoroughly with warm water.</li>
  <li>Massage shampoo into the scalp and work through to the ends.</li>
  <li>Rinse well and follow with Keratin Smooth Conditioner.</li>
</ol>
<h3>Good To Know</h3>
<ul>
  <li>Avoid contact with eyes; if contact occurs, rinse with water.</li>
  <li>Imported from the UK. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,

  "w7-the-matte-fixer-makeup-setting-spray-60ml": `
<p>W7 The Matte Fixer Makeup Setting Spray locks your look in place for long-lasting, shine-free wear. A fine mist sets foundation, powder and eye makeup without disturbing it.</p>
<h3>Features</h3>
<ul>
  <li>Sets makeup for all-day wear</li>
  <li>Controls shine with a soft matte finish</li>
  <li>Ultra-fine, even mist</li>
  <li>Lightweight, never sticky</li>
  <li>Cruelty-free</li>
</ul>
<h3>Why W7 The Matte Fixer</h3>
<img src="${img("w7-the-matte-fixer-makeup-setting-spray-60ml")}" alt="W7 The Matte Fixer Setting Spray 60ml">
<p>In heat and humidity makeup can slide and turn shiny. A few spritzes create a flexible, breathable finish that keeps your base fresh and matte for hours.</p>
<h3>How To Use</h3>
<ol>
  <li>Finish your makeup as usual.</li>
  <li>Shake well and hold the bottle 20–25 cm from your face.</li>
  <li>Close your eyes and mist evenly in an "X" and "T" motion. Let it dry naturally.</li>
</ol>
<h3>Good To Know</h3>
<ul>
  <li>Can also be misted onto a damp sponge before applying foundation.</li>
  <li>Imported from the UK. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,

  "the-body-shop-vitamin-c-glow-boosting-moisturiser-50ml": `
<p>The Body Shop Vitamin C Glow Boosting Moisturiser gives tired, dull skin an instant radiance boost. The lightweight gel-cream hydrates for 24 hours and helps even out the look of skin tone.</p>
<h3>Features</h3>
<ul>
  <li>Vitamin C from Amazonian camu camu for visible glow</li>
  <li>24-hour hydration</li>
  <li>Lightweight gel-cream absorbs quickly</li>
  <li>Helps skin look more even and refreshed</li>
  <li>Vegan formula</li>
</ul>
<h3>Why Vitamin C Glow Boosting Moisturiser</h3>
<img src="${img("the-body-shop-vitamin-c-glow-boosting-moisturiser-50ml")}" alt="The Body Shop Vitamin C Glow Boosting Moisturiser 50ml">
<p>Camu camu berries are one of nature's richest sources of vitamin C. Combined with hydrating ingredients, it leaves skin looking brighter, smoother and naturally luminous.</p>
<h3>How To Use</h3>
<ol>
  <li>Cleanse and tone your skin.</li>
  <li>Warm a pea-sized amount between your fingertips.</li>
  <li>Smooth over face and neck morning and evening, avoiding the eye area.</li>
</ol>
<h3>Good To Know</h3>
<ul>
  <li>Use sunscreen during the day.</li>
  <li>Imported from the UK. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,

  "sebamed-baby-body-lotion-750ml": `
<p>Sebamed Baby Body Lotion protects and cares for delicate baby skin from the very first day. With pH 5.5, it supports the natural protective acid mantle that babies' skin develops in the first months.</p>
<h3>Features</h3>
<ul>
  <li>pH 5.5 supports the skin's natural barrier</li>
  <li>Chamomile and allantoin soothe and protect</li>
  <li>Long-lasting moisture without a greasy feel</li>
  <li>Clinically tested for gentle care</li>
  <li>Family-size 750ml pump bottle</li>
</ul>
<h3>Why Sebamed Baby Body Lotion</h3>
<img src="${img("sebamed-baby-body-lotion-750ml")}" alt="Sebamed Baby Body Lotion 750ml">
<p>Newborn skin is thinner and loses moisture faster than adult skin. Sebamed's pH 5.5 formula helps strengthen its natural defences while keeping it soft, smooth and comfortable.</p>
<h3>How To Use</h3>
<ol>
  <li>After bathing, gently pat your baby's skin dry.</li>
  <li>Pump a little lotion into your palm.</li>
  <li>Massage gently over the body, paying attention to dry areas.</li>
</ol>
<h3>Good To Know</h3>
<ul>
  <li>Suitable from birth.</li>
  <li>Imported from Germany. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,

  "absolute-new-york-supreme-slim-demi-matte-lipstick-peony-mlss59-1-3gm": `
<p>Absolute New York Supreme Slim Demi Matte Lipstick in Peony is a soft, rosy pink with a comfortable demi-matte finish. The slim bullet glides on smoothly for precise application and weightless, all-day colour.</p>
<iframe style="width: 100%; height: 35rem; margin-bottom: 30px" src="https://www.youtube.com/embed/48FKkYnXYKk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<h3>Features</h3>
<ul>
  <li>High-pigment colour with full coverage in one swipe</li>
  <li>Demi-matte finish that never feels dry</li>
  <li>Slim bullet for precise lines without a liner</li>
  <li>Long-lasting, transfer-resistant wear</li>
</ul>
<h3>How To Use</h3>
<ol>
  <li>Start with clean, moisturised lips.</li>
  <li>Outline the lips using the slim tip, starting from the centre of the upper lip.</li>
  <li>Fill in the rest of the lips and press together. Reapply as needed.</li>
</ol>
<h3>Good To Know</h3>
<ul>
  <li>Shade: Peony (MLSS59), 1.3 g.</li>
  <li>Imported from the USA. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,

  "absolute-new-york-dual-ended-brow-brush-for-eyes-abmb31": `
<p>Absolute New York Dual Ended Brow Brush pairs an angled brush for defining and filling brows with a spoolie for grooming and blending, so you get natural, polished brows with one tool.</p>
<iframe style="width: 100%; height: 35rem; margin-bottom: 2.5rem" src="https://www.youtube.com/embed/vBjeZMONUxk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<h3>Features</h3>
<ul>
  <li>Angled brush for precise brow definition</li>
  <li>Spoolie end to groom and blend colour</li>
  <li>Soft synthetic bristles, suitable for powders and pomades</li>
  <li>Slim handle for easy control</li>
</ul>
<h3>How To Use</h3>
<ol>
  <li>Brush brows upward with the spoolie.</li>
  <li>Use the angled end to fill sparse areas with short, hair-like strokes.</li>
  <li>Blend with the spoolie for a soft, natural finish.</li>
</ol>
<h3>Good To Know</h3>
<ul>
  <li>Code: ABMB31.</li>
  <li>Imported from the USA. 100% authentic, sourced by BanglaShoppers.</li>
</ul>`,
};
