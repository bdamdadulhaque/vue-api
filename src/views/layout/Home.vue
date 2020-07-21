<template>
    <div class="container">
        <div class="row">
        <div class="col-md-12">
            <h4 class="text-center hadith-slogan">হযরত মোহাম্মদ (স) এর সকল হাদীস সমূহ এখন আপনার হাতের মুঠোয়</h4>
        </div>
        </div>
        <!-- Begin home big search -->
        <div class="row">
        <div class="col-md-8 offset-md-2">
          <form @submit.prevent="searchHadith()" class="home-big-search">
            <input v-model="search_keyword" name="search_keyword" type="text" placeholder="Search for hadith" aria-label="Search">
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
        </div><!-- End home big search -->
        <!-- Begin bello home big search -->
        <div class="row">
        <div class="col-md-8 offset-md-2 home-search">
            <!-- Nav pills -->
            <ul class="nav nav-pills justify-content-center" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="pill" href="#home">Daily Hadith <span class="nav-item-separator">|</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#menu1">Advance Search <span class="nav-item-separator">|</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#menu2">Search by Hadith No.</a>
            </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
            <div id="home" class="container tab-pane active home-daily-hadith">
                <p>{{dailyHadithRow.daily_hadith}}</p>
            </div>
            <div id="menu1" class="container tab-pane fade">
              <form @submit.prevent="advanceSearch()" class="form-inline">
                <label for="books" class="mb-2 mr-sm-2 offset-sm-2">Books:</label>
                <select v-model="book_id" name="book_id" class="form-control mb-2 mr-sm-2" id="books" @change="getChapters()">
                    <option :value="0" disabled>Select Book</option>
                    <option v-for="(book, index1) in books" :key="index1" :value="book.id">{{book.book_name}}</option>
                </select>
                <label for="chapters" class="mb-2 mr-sm-2">Chapters:</label>
                <select v-model="chapter_id" name="chapter_id" class="form-control mb-2 mr-sm-2" id="chapters">
                    <option :value="0" disabled>Select Chapter</option>
                    <option v-for="(chapter, index2) in chapters" :key="index2" :value="chapter.id">{{chapter.chapter_name}}</option>
                </select>
                <button type="submit" class="btn btn-primary mb-2">Go</button>
              </form>
            </div>
            <div id="menu2" class="container tab-pane fade">
              <form @submit.prevent="searchByHadithNo()" class="form-inline">
                <label for="books" class="mb-2 mr-sm-2 offset-sm-1">Books:</label>
                <!-- <input type="text" class="form-control mb-2 mr-sm-2" id="books" name="books"> -->
                <select v-model="book_id" name="book_id" class="form-control mb-2 mr-sm-2" id="books">
                    <option :value="0" disabled>Select Book</option>
                    <option v-for="(book, index3) in books" :key="index3" :value="book.id">{{book.book_name}}</option>
                </select>
                <label for="hadithNo" class="mb-2 mr-sm-2">Hadith No:</label>
                <input v-model="hadith_no" name="hadith_no" type="text" class="form-control mb-2 mr-sm-2" id="hadithNo" placeholder="Hadith no.">
                <button type="submit" class="btn btn-primary mb-2">Go</button>
              </form>
            </div>
            </div>
        </div>
        </div><!-- Begin bello home big search -->
        <!-- Begin book list -->
        <div class="row text-center home-book mt-5">
        <div v-for="(book, index) in books" :key="index" class="col-md-3 home-book-item">
            <router-link :to="{name:'books', params:{book_id:book.id}}"><i class="fa fa-square"></i> {{book.book_name}}</router-link>
        </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data() {
    return {
      books:[],
      book_id:'0',
      chapter_id:'0',
      hadith_no:'',
      chapters:[],
      search_keyword:'',
      dailyHadithRow:''
    };
  },
  methods: {
    bookList() {
      axios
        .get("/homepagebook")
        .then(response => {
          this.books = response.data.fetched_book;
        })
        .catch(error => {
          iziToast.error({
            title: "Error",
            message: "Something wrong, record not fetched!",
            position: "topRight",
            timeout: 2000
          });
        });
    },
    getChapters(){
      axios.get('/homepagechapter/'+this.book_id)
        .then(response =>{
          this.chapters = response.data.fetched_chapter;
        })
        .catch(error => {
          iziToast.error({
            title: "Error",
            message: "Something wrong, Chapter not fetched!",
            position: "topRight",
            timeout: 2000
          });
        });
    },
    searchHadith(){
      this.$router.push({ name: 'search-home', params: { search_keyword: this.search_keyword } })
    },
    dailyHadith(){
      axios.get('/homepagedailyhadith')
        .then(response =>{
          console.log("amdad "+response.data.fetched_daily_hadith_row.daily_hadith)
          if(response.data.fetched_daily_hadith_row.daily_hadith != null){
            this.dailyHadithRow = response.data.fetched_daily_hadith_row;
          }
        })
    },
    advanceSearch(){
      this.$router.push({ name: 'advance-search', params: { chapter_id: this.chapter_id } })
    },
    searchByHadithNo(){
      this.$router.push({ 
        name: 'search-single-home', 
        params: { 
          book_id: this.book_id,
          hadith_no: this.hadith_no 
        } 
      })
    }
      //this.$router.push({ path: 'search', query: { search_result: response.data.searched_hadith } })
      // this.$router.push({ 
      //   name: 'search', 
      //   params: { 
      //     book_id: this.book_id, 
      //     hadith_no: this.hadith_no 
      //   } 
      // });
  },
  mounted() {
    this.bookList();
    this.dailyHadith();
  }
}
</script>