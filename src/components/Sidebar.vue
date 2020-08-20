<template>
    <!-- Begin left sidebar -->
    <div class="col-md-3">
        <div class="left-sidebar">
            <!-- Nav pills -->
            <ul class="nav nav-pills mb-3" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="pill" href="#hadith-book">Hadith Books</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="pill" href="#search-hadith">Search by Hadith</a>
                </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content mb-3">
                <div id="hadith-book" class="container tab-pane active">
                    <div v-for="(book, index) in books" :key="index" class="list-group">
                        <router-link :to="{name:'books', params:{book_id:book.id}}" class="list-group-item list-group-item-action">{{book.book_name}}</router-link>
                    </div>
                </div>

                <div id="hadith-book-mobile" class="container tab-pane active">
                    <select v-model="bookOption" name="bookOption" @change="changeRoute()" class="form-control">
                        <option :value="0">Select Book</option>
                        <option v-for="(book, index) in books" :key="index" :value="book.id" class="list-group">
                                {{book.book_name}}
                        </option>
                    </select>
                    <!-- <div v-for="(book, index) in books" :key="index" class="list-group">
                        <router-link :to="{name:'books', params:{book_id:book.id}}" class="list-group-item list-group-item-action">{{book.book_name}}</router-link>
                    </div> -->
                </div>


                <div id="search-hadith" class="container tab-pane fade">
                <form @submit.prevent="searchByHadithNo()">
                    <select v-model="book_id" name="book_id" class="form-control mb-2 mr-sm-2" id="books">
                        <option :value="0">Select Book</option>
                        <option v-for="(book, index2) in books" :key="index2" :value="book.id">{{book.book_name}}</option>
                    </select>
                    <input v-model="hadith_no" name="hadith_no" type="text" class="form-control mb-2 mr-sm-2" id="hadithNo" placeholder="Hadith no.">
                    <button type="submit" class="btn btn-primary mb-2">Go</button>
                </form>
                </div>
            </div>
            <!--Begin daily hadith -->
            <!-- <div class="sidebar-daily-hadith">
                <h6><span>Daily Hadith:</span> {{dailyHadithData.daily_hadith_date}}</h6>
                <p>{{dailyHadithData.daily_hadith}}.. <a v-if="dailyHadithData.daily_hadith_link != null" :href="dailyHadithData.daily_hadith_link">Details</a></p>
            </div>  -->
            <!--End daily hadith --> 

        </div><!-- End left sidebar -->
    </div><!-- End col-md-3 -->
</template>
<script>
export default {
    data(){
        return {
            books:[],
            book_id:'0',
            hadith_no:'',
            dailyHadithData:'',
            bookOption:'0'
        }
    },
    methods:{
        bookList() {
            axios
                .get("/layoutpagebook")
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
        changeRoute() {
            this.$router.push({path:'/books/' + this.bookOption })
        },
        dailyHadith(){
            axios.get('/homepagedailyhadith')
                .then(response =>{
                    if(response.data.fetched_daily_hadith_row.daily_hadith != null){
                        this.dailyHadithData = response.data.fetched_daily_hadith_row;
                    }
            })
        },
        searchByHadithNo(){
            if(this.$route.name == 'search-single-sidebar'){
                this.$router.push({ 
                name: 'search-single-home', 
                    params: { 
                        book_id: this.book_id,
                        hadith_no: this.hadith_no 
                    } 
                })
            }
            else{
                this.$router.push({ 
                name: 'search-single-sidebar', 
                params: { 
                    book_id: this.book_id,
                    hadith_no: this.hadith_no 
                } 
            })
            }
        }
    },
    mounted() {
        this.bookList();
        this.dailyHadith();
    }
}
</script>
<style scoped>
a.nav-link{
  color:#009688;
}
a.nav-link.active{
  background-color:#009688;
}
</style>