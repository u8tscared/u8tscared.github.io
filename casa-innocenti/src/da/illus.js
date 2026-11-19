/* Illustrations produits Casa Innocenti — SVG dessinés à la main, viewBox 240×240 */
const INK = '#2B1D16';
const sh = (cx = 120, cy = 206, rx = 70) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="9" fill="${INK}" opacity=".12"/>`;
const ILLUS = {
prosciutto: `${sh(120,208,78)}
 <g transform="rotate(-18 120 120)">
  <path d="M60 150c-22-40 0-98 52-108 40-8 70 14 74 44 3 26-14 44-34 56l-38 22c-24 13-44 8-54-14z" fill="#E8B9A6"/>
  <path d="M68 146c-16-34 4-82 48-90 34-6 58 12 61 37 3 22-12 37-29 47l-34 20c-20 11-37 6-46-14z" fill="#C94F52"/>
  <path d="M84 120c14-6 28-2 40 8M96 94c16-4 32 2 42 14M108 140c10-4 20-2 28 4" stroke="#F3D2C6" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/>
  <path d="M148 156l44 26c8 5 10 14 4 20-5 6-14 5-20 0l-40-34z" fill="#E8B9A6"/>
  <circle cx="190" cy="196" r="12" fill="#F4E6D8"/><circle cx="190" cy="196" r="5" fill="#D9C2AE"/>
  <path d="M172 176c6 4 10 8 12 14" stroke="#B88A6E" stroke-width="2" fill="none"/>
  <path d="M164 168l10-6M168 174l10-6" stroke="#8C6A4E" stroke-width="2"/>
 </g>
 <path d="M150 40c4 12 4 22 0 30" stroke="#8C6A4E" stroke-width="2" fill="none"/>`,
burrata: `${sh(120,204,74)}
 <path d="M40 190c10-30 40-46 80-46s70 16 80 46z" fill="#5E8C3A"/>
 <path d="M58 186c14-20 36-30 62-30M120 156c28 0 50 12 62 30" stroke="#466E2A" stroke-width="3" fill="none"/>
 <ellipse cx="120" cy="140" rx="58" ry="52" fill="#FBF8F1"/>
 <path d="M70 152c8 22 30 36 52 36 26 0 46-14 54-36-14 14-32 20-52 20s-40-6-54-20z" fill="#E9E2D3"/>
 <path d="M104 92c4-14 28-14 32 0 2 8-6 12-16 12s-18-4-16-12z" fill="#F1EADB"/>
 <path d="M108 96c-6-14-2-26 6-30M132 96c6-12 2-24-6-28" stroke="#E2D8C4" stroke-width="5" stroke-linecap="round" fill="none"/>
 <path d="M150 156c10 4 18 12 20 22-12-2-22-8-26-18z" fill="#FFFDF7"/>
 <ellipse cx="98" cy="122" rx="14" ry="9" fill="#fff" opacity=".8"/>
 <path d="M166 84c10-2 20 4 22 14-10 2-20-4-22-14z" fill="#3E7D34"/><path d="M166 84l22 14" stroke="#2F6328" stroke-width="1.5"/>`,
parmigiano: `${sh(120,206,80)}
 <path d="M30 168l150-96 34 18v62L64 200z" fill="#E9C46A"/>
 <path d="M30 168l150-96 34 18L64 186z" fill="#F4D98E"/>
 <path d="M64 186l150-96v62L64 200z" fill="#C98F2E"/>
 <path d="M64 186l150-96" stroke="#B57A22" stroke-width="2"/>
 <g fill="#E1B856"><circle cx="90" cy="150" r="3"/><circle cx="120" cy="128" r="2.5"/><circle cx="150" cy="112" r="3"/><circle cx="110" cy="152" r="2"/><circle cx="160" cy="98" r="2"/><circle cx="76" cy="166" r="2"/></g>
 <path d="M188 64l10-14 8 6-6 16z" fill="#F4D98E"/><path d="M200 74l12-6 2 8-12 4z" fill="#E9C46A"/>`,
tagliatelle: `${sh(120,204,82)}
 <ellipse cx="120" cy="150" rx="84" ry="42" fill="#F2DE9C"/>
 <g fill="none" stroke-linecap="round">
  <path d="M46 150c0-30 34-50 74-50s74 20 74 50-34 44-74 44-74-14-74-44z" stroke="#E7B94A" stroke-width="10"/>
  <path d="M62 148c0-22 26-38 58-38s58 16 58 38-26 34-58 34-58-12-58-34z" stroke="#F0C858" stroke-width="10"/>
  <path d="M78 146c0-16 18-26 42-26s42 10 42 26-18 24-42 24-42-8-42-24z" stroke="#E2AE3C" stroke-width="10"/>
  <path d="M94 146c0-8 12-14 26-14s26 6 26 14-12 14-26 14-26-6-26-14z" stroke="#F3CF66" stroke-width="9"/>
  <path d="M56 122c20-18 50-26 86-20M70 176c24 12 60 12 86 0" stroke="#FBE3A0" stroke-width="3"/>
 </g>
 <g fill="#fff" opacity=".85"><circle cx="40" cy="194" r="2"/><circle cx="200" cy="190" r="2.5"/><circle cx="186" cy="110" r="1.6"/><circle cx="52" cy="112" r="1.8"/></g>`,
salame: `${sh(118,204,84)}
 <g transform="rotate(-14 120 130)">
  <rect x="30" y="98" width="150" height="62" rx="31" fill="#8E2F2B"/>
  <rect x="30" y="98" width="150" height="62" rx="31" fill="url(#net)" opacity=".55"/>
  <path d="M40 112c40-8 100-8 130 0" stroke="#B8564C" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/>
  <path d="M30 129c-10 0-16-4-18-10" stroke="#C9A77A" stroke-width="3" fill="none"/>
  <ellipse cx="180" cy="129" rx="18" ry="31" fill="#C24848"/>
  <g fill="#F4D7CB"><circle cx="176" cy="116" r="3"/><circle cx="186" cy="128" r="2.5"/><circle cx="174" cy="138" r="3.2"/><circle cx="184" cy="146" r="2"/><circle cx="180" cy="124" r="1.8"/></g>
 </g>
 <g transform="translate(186 168) rotate(-14)"><ellipse rx="22" ry="22" fill="#E8C9B9"/><ellipse rx="19" ry="19" fill="#C24848"/><g fill="#F4D7CB"><circle cx="-6" cy="-6" r="3"/><circle cx="7" cy="2" r="2.5"/><circle cx="-4" cy="8" r="2.8"/><circle cx="4" cy="-10" r="1.8"/></g></g>
 <defs><pattern id="net" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0h14M0 0v14" stroke="#F1E3C8" stroke-width="1.6"/></pattern></defs>`,
tortellini: `${sh(120,204,80)}
 <ellipse cx="120" cy="170" rx="88" ry="30" fill="#FFFFFF" stroke="#E7E0D2" stroke-width="2"/>
 <ellipse cx="120" cy="166" rx="70" ry="20" fill="#F7F2E8"/>
 ${[[78,140,-12],[132,132,10],[104,168,4],[160,164,-8]].map(([x,y,r]) => `<g transform="translate(${x} ${y}) rotate(${r})">
   <path d="M-30 4c0-22 14-34 30-34s30 12 30 34c0 10-8 16-16 12l-6-4c-4-2-12-2-16 0l-6 4c-8 4-16-2-16-12z" fill="#F0CB6E"/>
   <path d="M-22 4c0-14 10-24 22-24s22 10 22 24" stroke="#E2AE3C" stroke-width="3" fill="none"/>
   <circle cx="0" cy="-2" r="7" fill="#E4B24C"/><circle cx="0" cy="-2" r="3.5" fill="#D99E36"/></g>`).join('')}
 <g fill="#4D8A3A"><path d="M178 132c8-6 18-4 22 4-8 6-18 4-22-4z"/><path d="M60 178c-8-4-10-12-6-18 8 2 10 10 6 18z"/></g>`,
olio: `${sh(120,210,60)}
 <path d="M96 60h48v20c18 10 26 26 26 46v74c0 6-4 10-10 10H80c-6 0-10-4-10-10v-74c0-20 8-36 26-46z" fill="#3E5C2A"/>
 <path d="M104 22h32v40h-32z" fill="#3E5C2A"/><rect x="100" y="12" width="40" height="16" rx="3" fill="#C9A15A"/>
 <path d="M84 104c0-10 6-18 14-22v112H84z" fill="#5C7F3E" opacity=".7"/>
 <rect x="74" y="122" width="92" height="64" rx="4" fill="#F7F1E3"/>
 <rect x="74" y="122" width="92" height="64" rx="4" fill="none" stroke="#C9A15A" stroke-width="2"/>
 <text x="120" y="146" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="15" fill="${INK}">Olio</text>
 <text x="120" y="162" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="7" letter-spacing="1.6" fill="${INK}">EXTRA VERGINE</text>
 <path d="M96 174h48" stroke="#1F7A46" stroke-width="3"/><path d="M112 174h16" stroke="#fff" stroke-width="3"/><path d="M128 174h16" stroke="#C8202F" stroke-width="3"/>
 <path d="M168 100c18 6 34 22 40 44" stroke="#6B5434" stroke-width="2.5" fill="none"/>
 <g fill="#6E8B3D"><path d="M182 112c10-8 22-6 26 2-10 6-20 6-26-2z"/><path d="M196 132c4-12 16-14 22-8-4 10-14 12-22 8z"/></g>
 <ellipse cx="206" cy="150" rx="6" ry="8" fill="#4F6B2A"/><ellipse cx="190" cy="124" rx="5" ry="7" fill="#2E3D1F"/>`,
panettone: `${sh(120,210,74)}
 <path d="M54 110c0-44 30-70 66-70s66 26 66 70z" fill="#B8692E"/>
 <path d="M66 104c2-34 26-54 54-54s52 20 54 54" fill="#CE8443"/>
 <path d="M120 44v58M86 60l34 42M154 60l-34 42" stroke="#E4B17A" stroke-width="5" stroke-linecap="round"/>
 <g fill="#7A2E1E"><circle cx="90" cy="88" r="3.2"/><circle cx="146" cy="78" r="3"/><circle cx="108" cy="70" r="2.6"/><circle cx="160" cy="96" r="2.8"/></g>
 <path d="M54 104h132v96c0 6-4 10-10 10H64c-6 0-10-4-10-10z" fill="#E7D3B0"/>
 <path d="M54 104h132v96c0 6-4 10-10 10H64c-6 0-10-4-10-10z" fill="url(#pleat)"/>
 <rect x="54" y="138" width="132" height="22" fill="#B3262E"/>
 <text x="120" y="153" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="12" fill="#F7E7C8">Panettone · Milano</text>
 <path d="M54 104h132" stroke="#C9AE80" stroke-width="3"/>
 <defs><pattern id="pleat" width="12" height="10" patternUnits="userSpaceOnUse"><path d="M6 0v10" stroke="#CDB58B" stroke-width="2"/></pattern></defs>`,
pecorino: `${sh(120,206,78)}
 <path d="M36 160l60-104 110 50-14 58L48 190z" fill="#2E2A27"/>
 <path d="M36 160l60-104 110 50L56 176z" fill="#F4EEDC"/>
 <path d="M56 176l150-70-14 58L48 190z" fill="#1E1B19"/>
 <g fill="#E3DAC2"><circle cx="96" cy="120" r="4"/><circle cx="130" cy="112" r="2.6"/><circle cx="80" cy="150" r="2.4"/><circle cx="150" cy="128" r="3"/><circle cx="112" cy="146" r="2"/></g>
 <path d="M178 54c10-10 24-10 30 0-10 10-22 10-30 0z" fill="#4D8A3A"/><path d="M178 54h30" stroke="#356B2A" stroke-width="1.5"/>`,
pesto: `${sh(120,210,62)}
 <rect x="70" y="46" width="100" height="26" rx="5" fill="#B3262E"/>
 <path d="M70 58h100" stroke="#8E1C23" stroke-width="2"/>
 <path d="M66 72h108v120c0 10-8 18-18 18H84c-10 0-18-8-18-18z" fill="#E6EFE2" opacity=".7"/>
 <path d="M70 100h100v90c0 8-6 14-14 14H84c-8 0-14-6-14-14z" fill="#4F7F2A"/>
 <path d="M70 100c16 8 34-6 50 2s34 6 50-2" fill="#6E9C38"/>
 <g fill="#3A6020"><circle cx="90" cy="140" r="3"/><circle cx="140" cy="160" r="2.5"/><circle cx="120" cy="184" r="3"/><circle cx="150" cy="124" r="2"/></g>
 <g fill="#EADFB8"><circle cx="104" cy="168" r="2.5"/><circle cx="130" cy="132" r="2"/></g>
 <rect x="84" y="128" width="72" height="44" rx="4" fill="#FFFBF2"/>
 <text x="120" y="150" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="14" fill="${INK}">Pesto</text>
 <text x="120" y="163" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="6.5" letter-spacing="1.4" fill="${INK}">ALLA GENOVESE</text>
 <path d="M76 82v100" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>
 <path d="M172 96c14-14 34-12 40 2-14 12-30 12-40-2z" fill="#3E7D34"/><path d="M172 96l40 2" stroke="#2F6328" stroke-width="1.5"/>
 <path d="M178 116c8-12 24-14 30-4-8 12-22 12-30 4z" fill="#4D8A3A"/>`,
vino: `${sh(120,212,64)}
 <path d="M110 18h20v16h-20z" fill="#B3262E"/><path d="M112 32h16v52h-16z" fill="#2A4A2A"/>
 <path d="M120 80c-40 0-60 30-60 66 0 38 26 62 60 62s60-24 60-62c0-36-20-66-60-66z" fill="#3B5E35"/>
 <path d="M60 150c0 34 26 58 60 58s60-24 60-58z" fill="#D9B46A"/>
 <path d="M64 162c40 6 72 6 112 0M66 178c36 6 72 6 108 0M74 194c30 5 62 5 92 0" stroke="#B88E44" stroke-width="3" fill="none"/>
 <g stroke="#C79F55" stroke-width="2" opacity=".8"><path d="M80 152l-6 50M100 152l-2 56M120 152v58M140 152l2 56M160 152l6 50"/></g>
 <rect x="92" y="108" width="56" height="36" rx="3" fill="#F7EEDC"/>
 <text x="120" y="124" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="11" fill="#7A1E22">Chianti</text>
 <text x="120" y="136" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="6" letter-spacing="1.2" fill="${INK}">CLASSICO</text>
 <path d="M84 100c6-8 14-12 22-14" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".35" fill="none"/>`,
espresso: `${sh(116,210,74)}
 <path d="M70 120h64l8 80H62z" fill="#B9BEC2"/>
 <path d="M70 120h64l8 80H62z" fill="url(#facet)"/>
 <path d="M74 66h56l-6 54H80z" fill="#CDD2D6"/><path d="M80 120h44" stroke="#8F969C" stroke-width="4"/>
 <path d="M84 56h36l10 10H74z" fill="#A9AFB4"/><circle cx="102" cy="50" r="7" fill="#2B2B2B"/>
 <path d="M130 76c22 0 30 10 30 22s-8 22-30 22" stroke="#2B2B2B" stroke-width="10" fill="none" stroke-linecap="round"/>
 <path d="M74 66l-10-6" stroke="#A9AFB4" stroke-width="6" stroke-linecap="round"/>
 <path d="M98 30c-6 8 6 10 0 18M110 26c-6 8 6 10 0 18" stroke="#C9C4BE" stroke-width="3" fill="none" stroke-linecap="round"/>
 <path d="M150 168h44l-4 26c-1 6-6 10-12 10h-12c-6 0-11-4-12-10z" fill="#FFFFFF" stroke="#E2DCD2" stroke-width="2"/>
 <path d="M194 176c10 0 12 14 0 16" stroke="#E2DCD2" stroke-width="4" fill="none"/>
 <ellipse cx="172" cy="170" rx="21" ry="4" fill="#6B3E22"/><ellipse cx="172" cy="206" rx="34" ry="5" fill="#fff" stroke="#E2DCD2" stroke-width="2"/>
 <defs><pattern id="facet" width="16" height="80" patternUnits="userSpaceOnUse"><rect width="8" height="80" fill="#fff" opacity=".18"/></pattern></defs>`,
tiramisu: `${sh(120,212,60)}
 <path d="M66 70h108l-10 128c-1 8-7 12-14 12H90c-7 0-13-4-14-12z" fill="#EEF2F4" opacity=".75"/>
 <path d="M70 92h100l-2 24H72z" fill="#5A3622"/>
 <path d="M72 116h96l-2 30H74z" fill="#F6E9CF"/>
 <path d="M74 146h92l-3 28H77z" fill="#7B4A2B"/>
 <path d="M77 174h86l-3 22c-1 6-6 10-12 10H92c-6 0-11-4-12-10z" fill="#F3E3C2"/>
 <path d="M68 80c16-10 34 4 52-4s36 6 52-4l-2 20H70z" fill="#F6E9CF"/>
 <path d="M68 80c16-10 34 4 52-4s36 6 52-4" fill="none" stroke="#6B3E22" stroke-width="6" stroke-linecap="round" opacity=".85"/>
 <g fill="#4A2A18"><circle cx="90" cy="76" r="2"/><circle cx="130" cy="74" r="2"/><circle cx="150" cy="78" r="1.8"/></g>
 <path d="M150 38l-26 70" stroke="#C9CDD1" stroke-width="5" stroke-linecap="round"/><ellipse cx="152" cy="34" rx="7" ry="11" fill="#C9CDD1" transform="rotate(20 152 34)"/>
 <path d="M78 74v120" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>
 <circle cx="180" cy="58" r="7" fill="#C8202F"/><path d="M180 51c2-6 6-8 10-8" stroke="#3E7D34" stroke-width="2" fill="none"/>`,
panino: `${sh(120,206,90)}
 <path d="M28 150c0-40 40-62 92-62s92 22 92 62z" fill="#D9A15A"/>
 <path d="M40 140c4-28 38-44 80-44s76 16 80 44" fill="#E8B56C"/>
 <g stroke="#F3D49A" stroke-width="4" stroke-linecap="round"><path d="M70 112l14-8M108 102l16-6M150 108l14 4M90 128l12-6M134 124l14-2"/></g>
 <path d="M26 152c20 8 40-8 60 2s40-8 60 2 40-8 62 0l2 10H26z" fill="#C94F52"/>
 <path d="M30 160c18-6 30 6 48 0s30 6 50 0 32 6 52 0 26 4 34 0" stroke="#F3D2C6" stroke-width="3" fill="none"/>
 <path d="M24 166c22-10 36 10 56 0s34 10 54 0 34 10 56 0 22 4 30 0v8H24z" fill="#5E8C3A"/>
 <ellipse cx="160" cy="166" rx="26" ry="10" fill="#FBF8F1"/>
 <path d="M28 176h184c0 14-38 24-92 24s-92-10-92-24z" fill="#C98B48"/>`,
focaccia: `${sh(120,206,92)}
 <rect x="26" y="96" width="188" height="100" rx="18" fill="#D99A4A"/>
 <rect x="30" y="92" width="180" height="94" rx="16" fill="#EBB868"/>
 <g fill="#C8873A">${[[60,118],[100,112],[140,120],[180,114],[80,150],[120,146],[160,152],[56,168],[190,166]].map(([x,y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="5"/>`).join('')}</g>
 <g fill="#F7DFA6" opacity=".9"><circle cx="70" cy="132" r="2"/><circle cx="150" cy="136" r="2"/><circle cx="110" cy="166" r="2"/><circle cx="176" cy="132" r="1.6"/></g>
 <g fill="#4D8A3A"><path d="M90 136c6-6 14-6 18 0-6 5-12 5-18 0z"/><path d="M150 166c6-6 14-6 18 0-6 5-12 5-18 0z"/></g>
 <g fill="#D7262F"><circle cx="128" cy="124" r="7"/><circle cx="66" cy="152" r="7"/><circle cx="180" cy="146" r="6"/></g>`,
pizza: `${sh(120,208,84)}
 <path d="M40 180L120 40l80 140z" fill="#F0C46A"/>
 <path d="M34 182c30 14 142 14 172 0l-6-12c-30 12-130 12-160 0z" fill="#C9813A"/>
 <path d="M52 170L120 52l68 118c-40 10-96 10-136 0z" fill="#D9452F"/>
 <g fill="#FBF3DF">${[[110,96],[132,126],[96,140],[150,156],[86,164]].map(([x,y]) => `<path d="M${x} ${y}c6-8 18-8 20 0 2 8-4 12-10 12s-12-4-10-12z"/>`).join('')}</g>
 <g fill="#3E7D34">${[[122,80],[106,122],[140,146],[118,160]].map(([x,y]) => `<path d="M${x} ${y}c6-8 16-8 18 0-6 6-12 6-18 0z"/>`).join('')}</g>
 <g fill="#E58A8A" opacity=".85"><ellipse cx="124" cy="108" rx="10" ry="5"/><ellipse cx="100" cy="158" rx="10" ry="5"/></g>`,
board: `${sh(120,210,96)}
 <path d="M20 150c0-10 8-18 18-18h150c10 0 18 8 18 18v34c0 10-8 18-18 18H38c-10 0-18-8-18-18z" fill="#B27A47"/>
 <path d="M20 150c0-10 8-18 18-18h150c10 0 18 8 18 18v20H20z" fill="#C88F57"/>
 <path d="M206 160h18c6 0 8 8 2 10l-20 4z" fill="#B27A47"/>
 <path d="M36 146c40-4 100-4 150 0" stroke="#D9A46A" stroke-width="2" fill="none"/>
 ${[[60,138],[78,134],[96,138]].map(([x,y]) => `<g transform="translate(${x} ${y})"><ellipse rx="14" ry="10" fill="#C24848"/><g fill="#F4D7CB"><circle cx="-4" cy="-2" r="2"/><circle cx="4" cy="2" r="1.8"/><circle cx="0" cy="4" r="1.4"/></g></g>`).join('')}
 <path d="M110 140c8-16 30-20 44-10-6 14-30 18-44 10z" fill="#E8A3A0"/><path d="M116 138c8-8 22-10 32-6" stroke="#F7D5D0" stroke-width="3" fill="none"/>
 <g fill="#F2D27A"><path d="M156 124l18-6 6 18-18 6z"/><path d="M170 140l16-4 4 14-16 4z" fill="#E9C46A"/></g>
 <g fill="#6E8B3D"><ellipse cx="130" cy="154" rx="6" ry="8"/><ellipse cx="144" cy="156" rx="6" ry="8"/></g><ellipse cx="118" cy="158" rx="6" ry="8" fill="#2E3D1F"/>
 <path d="M40 110l110-40M46 120l120-46" stroke="#E7C27E" stroke-width="7" stroke-linecap="round"/>
 <path d="M40 110l110-40M46 120l120-46" stroke="#D3A55C" stroke-width="7" stroke-linecap="round" stroke-dasharray="2 10" opacity=".7"/>
 <circle cx="74" cy="166" r="10" fill="#FBF8F1"/><path d="M200 120c10-6 20-2 22 6-10 4-18 2-22-6z" fill="#3E7D34"/>`
};
/* petits motifs flottants pour le décor */
const DECO = {
basilico:`<svg viewBox="0 0 60 60"><path d="M10 40C14 18 34 8 52 10 50 30 34 48 10 40z" fill="#3E7D34"/><path d="M10 40C24 30 38 20 52 10" stroke="#2F6328" stroke-width="2" fill="none"/></svg>`,
oliva:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="32" rx="14" ry="19" fill="#6E8B3D" transform="rotate(-20 30 32)"/><ellipse cx="25" cy="25" rx="4" ry="6" fill="#fff" opacity=".35" transform="rotate(-20 25 25)"/></svg>`,
pomodoro:`<svg viewBox="0 0 60 60"><circle cx="30" cy="34" r="20" fill="#D7262F"/><path d="M30 14l-8-4 8 8 8-8zM30 14v-6" stroke="#3E7D34" stroke-width="3" fill="#3E7D34" stroke-linejoin="round"/><ellipse cx="22" cy="28" rx="5" ry="3" fill="#fff" opacity=".35"/></svg>`,
limone:`<svg viewBox="0 0 60 60"><path d="M8 32c0-12 10-20 22-20s22 8 22 20-10 18-22 18S8 44 8 32z" fill="#F2C230"/><path d="M8 32l-4-2M52 32l4-2" stroke="#E0A91C" stroke-width="4" stroke-linecap="round"/><path d="M40 12c6-6 14-6 16-2-6 4-12 4-16 2z" fill="#3E7D34"/></svg>`
};
function illus(id, bg) { return `<svg class="ill" viewBox="0 0 240 240" role="img" aria-hidden="true">${ILLUS[id] || ''}</svg>`; }
