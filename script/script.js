const container = document.querySelector('.container');
const container2 = document.querySelector('.container2');
const lanjut = document.querySelector('.lanjut');
const rules = document.querySelector('.rules');
const konfirmasi = document.querySelector('.konfirmasi');
const cek = document.querySelector('.cek');
const cekp = document.querySelector('.cekp');
const game = document.querySelector('.game');
const load = document.querySelectorAll('.load');
const mulai = document.querySelector('.mulaigame');
const nama = document.querySelector('.namakel');
const nowa = document.querySelector('.nowa');
const perintah = document.querySelector('.perintah');
const nm = document.querySelector('.nm');
const nw = document.querySelector('.nw');
const select = document.querySelectorAll('.select');
const timer = document.querySelector('.timer');
const submit = document.querySelector('.submit');
const nilainy = document.querySelector('.nilainy');
const loading = document.querySelector('.loading');

function randomAngka() {
  return Math.floor(Math.random() * arguments.length + 1);
}
const computerInput1 = randomAngka(1,2,3,4,5,6,7,8,9);
const computerInput2 = randomAngka(1,2,3,4,5,6,7,8,9);
const computerInput3 = randomAngka(1,2,3,4,5,6,7,8,9);
const computerInput4 = randomAngka(1,2,3,4,5,6,7,8,9);
const computerInput5 = randomAngka(1,2,3,4,5,6,7,8,9);
const computerInput6 = randomAngka(1,2,3,4,5,6,7,8,9);
const computerInput7 = randomAngka(1,2,3,4,5,6,7,8,9);
const computerInput8 = randomAngka(1,2,3,4,5,6,7,8,9);

const computerInput = [computerInput1, computerInput2, computerInput3, computerInput4, computerInput5, computerInput6, computerInput7, computerInput8];

lanjut.addEventListener("click", function() {
  if (cek.checked == false) {
    window.navigator.vibrate(2000);
    cekp.style.color = 'rgba(255, 100, 60, 1)';
    setTimeout(function() {
      cekp.style.color = 'rgba(170, 170, 170, 1)';
    }, 2000);
  } else {
    lanjut.style.display = 'none';
    load[0].classList.remove('d-none');
    setTimeout(function() {
      load[0].classList.add('d-none');
      rules.style.display = 'none';
      konfirmasi.style.display = 'none';
      cek.style.display = 'none';
      cekp.style.display = 'none';
      game.classList.remove('d-none');
    }, 1500);
  }
});
mulai.style.border = 'none';
mulai.addEventListener("click", function() {
  if (nama.value == '') {
    nama.classList.add('aktif');
    window.navigator.vibrate(500);
    nm.style.color = 'rgba(255, 100, 60, 1)';
    setTimeout(function() {
      nama.classList.remove('aktif');
      nm.style.color = 'rgba(170, 170, 170, 1)';
    }, 500);
  }
  if (nowa.value == '') {
    nowa.classList.add('aktif');
    window.navigator.vibrate(500);
    nw.style.color = 'rgba(255, 100, 60, 1)';
    setTimeout(function() {
      nowa.classList.remove('aktif');
      nw.style.color = 'rgba(170, 170, 170, 1)';
    }, 500);
  } else {
    mulai.classList.add('d-none');
    load[1].classList.remove('d-none');
    setTimeout(function() {
      load[1].classList.add('d-none');
      timer.classList.remove('d-none');
      perintah.classList.remove('d-none');
      for(let i = 0; i < select.length; i++) {
        select[i].disabled = false;
      }
      let seconds = 60;
      function tick() {
        seconds--;
        timer.innerHTML = "waktu tersisa : " + (seconds < 10 ? "0" : "") + String(seconds) + ' detik';
        if (seconds > 0) {
          setTimeout(tick, 1000);
        } else if (seconds == 0) {
          let hasil1 = (select[0].value == computerInput1) ? 12.5 : 0;
          let hasil2 = (select[1].value == computerInput2) ? 12.5 : 0;
          let hasil3 = (select[2].value == computerInput3) ? 12.5 : 0;
          let hasil4 = (select[3].value == computerInput4) ? 12.5 : 0;
          let hasil5 = (select[4].value == computerInput5) ? 12.5 : 0;
          let hasil6 = (select[5].value == computerInput6) ? 12.5 : 0;
          let hasil7 = (select[6].value == computerInput7) ? 12.5 : 0;
          let hasil8 = (select[7].value == computerInput8) ? 12.5 : 0;
          let nilai = hasil1 + hasil2 + hasil3 + hasil4 + hasil5 + hasil6 + hasil7 + hasil8;
          window.navigator.vibrate(1000);
          submit.classList.remove('d-none');
          for(let i = 0; i < select.length; i++) {
             select[i].disabled = true;
             if(select[i].value == computerInput[i]) {
               select[i].style.color = 'rgba(80, 255, 40, 1)';
               select[i].style.border = '1px solid rgba(80, 255, 40, 1)';
             } else if (select[i].value != computerInput[i]) {
               select[i].style.color = 'rgba(255, 100, 60, 1)';
               select[i].style.border = '1px solid rgba(255, 100, 60, 1)';
             }
             timer.innerHTML = "waktu habis, nilai kamu : " + String(nilai);
             nilainy.innerHTML = String(nilai);
          }
          const scriptURL = 'https://script.google.com/macros/s/AKfycbyD6VwFOZcZaJT55GP12Xw76ZzByoOK0t1g8BBBwJgHiUts_yd7pCeiF0CAZN19izjHSA/exec';
          const form = document.forms['submit-to-google-sheet'];
          form.addEventListener('submit', e => {
             e.preventDefault();
             loading.classList.toggle('d-none');
             submit.classList.toggle('d-none');
             fetch(scriptURL, { method: 'POST', body: new FormData(form)})
             .then(response => {
                console.log('Success!', response);
                loading.classList.toggle('d-none');
                submit.classList.toggle('d-none');
                container.classList.add('d-none');
                container2.classList.replace('d-none', 'd-flex');
             })
             .catch(error => console.error('Error!', error.message));
          });
        }
      }
      tick();
    }, 1500);
  }
});