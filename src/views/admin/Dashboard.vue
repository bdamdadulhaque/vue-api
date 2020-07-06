<template>
    <div>
        <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
          
        <!-- Info boxes -->
        <div class="row mt-3">
          <div v-for="(book, index) in books" :key="index" class="col-12 col-sm-6 col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-primary elevation-1"><i class="fas fa-book"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">{{book.book_name}}</span>
                <button v-if="clickedBookId != book.id" @click="bookInfo(book.id)" class="btn btn-xs btn-outline-primary"><i class="fas fa-plus"></i> Show</button>
                <span v-if="clickedBookId == book.id">Chapter: {{chapterThisBook}}</span><br>
                <span v-if="clickedBookId == book.id">Hadith: {{hadithThisBook}}</span>
                <!-- <span class="info-box-number">Show</span> -->
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>

          <!-- /.col -->
          <!-- fix for small devices only -->
          <div class="clearfix hidden-md-up"></div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
          
      </div>
    </section>
    </div>
</template>
<script>
export default {
    data(){
        return {
            books:[],
            chapterThisBook:'',
            hadithThisBook:'',
            clickedBookId:''
        }
    },
    methods: {
        getBooksStatistics(){
            axios.get('/book')
                .then(response =>{
                this.books = response.data.fetched_book;
            })
            .catch(error => {
                iziToast.error({
                title: "Error",
                message: "Something wrong, record not fetched!",
                position: 'topRight',
                timeout: 2000
                });
            })
        },
        bookInfo(bookId){
            axios.get('/booksstatics/'+bookId)
                .then(response =>{
                    this.clickedBookId = bookId;
                    console.log(response.data.fetched_chapter)
                    this.chapterThisBook = response.data.fetched_chapter;
                    this.hadithThisBook = response.data.fetched_hadith;
            })
            .catch(error => {
                iziToast.error({
                title: "Error",
                message: "Something wrong, record not fetched!",
                position: 'topRight',
                timeout: 2000
                });
            })
        }
    },
    mounted(){
        this.getBooksStatistics();
    }
}
</script>