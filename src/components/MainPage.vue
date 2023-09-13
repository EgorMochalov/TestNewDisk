<template>
  <div>
    <div class="modal" :class="modal ? 'active' : 'disabled'">
      <div class="slider">
        <div class="item" v-for="img in images" :key="img">
          <a class="previous" v-on:click="previousSlide()">&#10094;</a>
          <img :src="img" :class="testA">
          <a class="next" v-on:click="nextSlide()">&#10095;</a>
          <div class="modal-controls">
            <label class="button-directory" for="file">Выберите дерикторию</label>
            <input id="file" name="file" type="file" class="disabled" v-on:change="(e) => indexing(e)" webkitdirectory
              directory multiple />
            <select name="pets" v-model="testA" id="pet-select" v-on:change="this.$store.commit('editVpis',this.testA)">
              <option value="" disabled selected>Выберите режим вписывания</option>
              <option value="testAll">Целиком</option>
              <option value="testV">По вертикали</option>
              <option value="testH">ПО горизонтали</option>
              <option value="default">1:1</option>
            </select>
            <button class="exit" v-on:click="()=>{this.modal = false;this.$store.commit('editModal',false)}">x</button>
          </div>
        </div>
        <div class="arrow_mobile">
          <a class="previous_mobile" v-on:click="previousSlide()">&#10094;</a>
          <a class="next_mobile" v-on:click="nextSlide()">&#10095;</a>
        </div>
      </div>
    </div>
    <h1>Test New Disk</h1>
    <p>Загружены следующие изображения:</p>
    <ol class="images-list">
      <li v-for="name in filesName" :key="name">{{ name }}</li>
    </ol>
    <div class="controls-container">
      <label class="button-directory" for="file">Выберите дерикторию</label>
      <input id="file" name="file" type="file" class="disabled" v-on:change="(e) => indexing(e)" webkitdirectory directory
        multiple />
      <select name="pets" v-model="testA" v-on:change="'editVpis',this.testA" id="pet-select">
        <option value="" disabled selected>Выберите режим вписывания</option>
        <option value="testAll">Целиком</option>
        <option value="testV">По вертикали</option>
        <option value="testH">ПО горизонтали</option>
        <option value="default">1:1</option>
      </select>
      <button class="button-show" :disabled="images.length == 0"
        v-on:click="() => { this.modal = !this.modal;this.$store.commit('editModal',this.modal); test() }">Режим просмотра</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      filesName: [],
      images: [],
      modal: false,
      slideIndex: 1,
      testA: ''
    }
  },
  created(){
    this.images = this.$store.state.data
    this.filesName = this.$store.state.names
    this.modal = this.$store.state.modal
    this.testA = this.$store.state.vpis 
  },
  methods: {
    indexing(e) {
      this.images = []
      this.$store.commit('clearData')
      this.$store.commit('clearNames')

      let files = Array.from(e.target.files).filter((el) => el.type.match('image.*'))
      this.filesName = files.map((el)=>el.name)
      let fr = new FileReader();

      function readFile(index) {
        if (index >= files.length) return;
        let file = files[index];
        this.$store.commit('addName',files[index].name)
        fr.onload = (e) => {
          this.images.push(e.currentTarget.result)
          this.$store.commit('addItem',e.currentTarget.result)
          readFile.apply(this, [index + 1])
        }
        fr.readAsDataURL(file)
      }
      readFile.apply(this, [0])
      if (this.modal) {
        this.showSlides(this.slideIndex)
      }
    },
    nextSlide() {
      this.showSlides(this.slideIndex += 1);
    },
    previousSlide() {
      this.showSlides(this.slideIndex -= 1);
    },
    сurrentSlide(n) {
      this.showSlides(this.slideIndex = n);
    },
    showSlides(n) {
      console.log(this.testA)
      /* Обращаемся к элементам с названием класса "item", то есть к картинкам: */
      let slides = document.getElementsByClassName("item");

      /* Проверяем количество слайдов: */
      if (n > slides.length) {
        this.slideIndex = 1
      }
      if (n < 1) {
        this.slideIndex = slides.length
      }

      /* Проходим по каждому слайду в цикле for: */
      for (let slide of slides) {
        slide.style.display = "none";
      }
      /* Делаем элемент блочным: */
      slides[this.slideIndex - 1].style.display = "flex";
    },
    test() {
      this.showSlides(this.slideIndex)
    }
  }
}
</script>

<style scoped>
body {
  position: relative;
  margin: 0;
}

.modal {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(99, 84, 84, 0.6);
}

.testV {
  width: 100%;
  height: auto;
}

.testH {
  height: 100%;
  width: auto;
}

.testAll {
  width: 100%;
  height: 100%;
}

.default {
  width: auto;
  height: auto;
}

.disabled {
  display: none;
}

.slider {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding: 50px;
  padding-bottom: 0;
  box-shadow: 4px 4px 5px 4px rgb(26, 25, 25);
  transition: 0.5s;
  background-color: rgb(0, 0, 0);
}

.modal-controls {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 10px;
}

.exit {
  padding: 0;
  cursor: pointer;
  background-color: white;
  border-radius: 100%;
  border: none;
  font-size: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider:hover {
  box-shadow: 5px 6px 6px 4px rgb(26, 25, 25);
  transition: 0.5s;
}

.item {
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  color: white;
}

.item_col {
  align-self: center;
  text-align: center;
}

.btn {
  padding: 10px;
  background-color: blueviolet;
  color: aliceblue;
  border-radius: 5px;
  transition: 0.5s;
  cursor: pointer;
}

.btn:hover {
  background-color: rgb(98, 32, 160);
  transition: 0.5s;
}

.slider .item img {
  display: block;
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
}

.previous,
.next {
  align-self: center;
  cursor: pointer;
  transition: 0.5s;
}

.arrow_mobile {
  display: none;
}

.previous:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5px;
}

.slider .item {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {

  /* Устанавливаем и изменяем степень прозрачности: */
  from {
    opacity: 0.4
  }

  to {
    opacity: 1
  }
}

@media screen and (max-width: 600px) {

  .controls-container {
    flex-direction: column;
  }

  .slider {
    padding-left: 0;
    padding-right: 0;
  }

  .item {
    flex-direction: column;
  }

  .slider {
    margin: 0;
    padding: auto;
  }

  .slider .item img {
    width: 100%;
    height: 80%;
    padding: 10px;
  }

  .previous,
  .next {
    display: none;
  }

  .arrow_mobile {
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    justify-content: space-around;
  }

  .previous_mobile,
  .next_mobile {
    align-self: center;
    cursor: pointer;
    transition: 0.5s;
    color: white;
  }
}

.controls-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.button-directory {
  padding: 10px;
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.images-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

select {
  padding: 10px;
}

.button-show {
  background: none;
  position: relative;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.button-show::before {
  content: "";
  width: 15px;
  height: 15px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  position: absolute;
  top: 0;
  right: 0;
}

.button-show::after {
  content: "";
  width: 15px;
  height: 15px;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
