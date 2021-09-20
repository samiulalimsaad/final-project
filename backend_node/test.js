const axios = require("axios");

const lang =
    "aav, aed, af, alv, am, ar, art, ase, az, bat, bcl, be, bem, ber, bg, bi, bn, bnt, bzs, ca, cau, ccs, ceb, cel, chk, cpf, crs, cs, csg, csn, cus, cy, da, de, dra, ee, efi, el, en, eo, es, et, eu, euq, fi, fj, fr, fse, ga, gaa, gil, gl, grk, guw, gv, ha, he, hi, hil, ho, hr, ht, hu, hy, id, ig, ilo, is, iso, it, ja, jap, ka, kab, kg, kj, kl, ko, kqn, kwn, kwy, lg, ln, loz, lt, lu, lua, lue, lun, luo, lus, lv, map, mfe, mfs, mg, mh, mk, mkh, ml, mos, mr, ms, mt, mul, ng, nic, niu, nl, no, nso, ny, nyk, om, pa, pag, pap, phi, pis, pl, pon, poz, pqe, pqw, prl, pt, rn, rnd, ro, roa, ru, run, rw, sal, sg, sh, sit, sk, sl, sm, sn, sq, srn, ss, ssp, st, sv, sw, swc, taw, tdt, th, ti, tiv, tl, tll, tn, to, toi, tpi, tr, trk, ts, tum, tut, tvl, tw, ty, tzo, uk, umb, ur, ve, vi, vsl, wa, wal, war, wls, xh, yap, yo, yua, zai, zh, zne";

const url = "https://huggingface.co/api/models/Helsinki-NLP/opus-mt-en-de";
const succ = [];
const fail = [];
const temp = lang.split(",");
function name() {
    temp.map(async (l) => {
        try {
            const { data } = await axios.get(url);
            console.log(data.tags.length);
            data.tags.length && succ.push(l);
        } catch (e) {
            fail.push(l);
            console.log(e.message);
        }
    });
    console.log("Hello");
    console.log(temp.length);
    console.log(succ.length);
    console.log(fail.length);
}

name()
