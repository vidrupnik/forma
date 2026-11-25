# FORMA – Vidova trening aplikacija

Spletna aplikacija (PWA): gostuje na GitHub Pages, podatki so v Supabase projektu `forma`.

## Kako shranjuje
- Vsak vnos (teža, ponovitve, kljukica, rehab, beljakovine …) se takoj zapiše v telefon in v ~0,4 s še v Supabase.
- Brez signala ostane na telefonu in se pošlje, ko je povezava spet tu.
- Nedokončan trening (vnosi pred "Zaključi trening") je shranjen v bazi, zato ga vidiš tudi po zaprtju aplikacije ali na drugi napravi.
- Slike napredka so samo na telefonu (baza je dostopna brez prijave).
- Napredek > Varnostna kopija: izvoz v .json in uvoz nazaj (uvoz samo dodaja, nič ne briše).

## Postavitev
1. Supabase > New project `forma` (Frankfurt, Free) > SQL Editor > prilepi `supabase.sql` > Run.
2. Project URL in publishable key vpiši v `config.js`.
3. GitHub Pages: Settings > Pages > Deploy from branch `main` / root.

## Na telefonu
- iPhone (Safari): Deli > Dodaj na začetni zaslon.
- Android (Chrome): ⋮ > Namesti aplikacijo.

## Vaje
Imena vaj so v angleščini, slike so iz [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (javna domena).
Vsak trening ima vsaj eno core vajo (Pallof Press, Hanging Leg Raise, RKC Plank, Ab Wheel Rollout) kot pripravo na Nordic.
Nove vaje dodaj vedno na konec seznama dneva v `app.js`, ker se shranjeni treningi sklicujejo na položaj vaje.
