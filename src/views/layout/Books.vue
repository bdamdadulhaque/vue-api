<template>
    <div class="container">
        <div class="row mb-5">
        <!-- Begin left sidebar -->
        <!-- <div class="col-md-3 left-sidebar"> -->
            <Sidebar/>
        <!-- </div> -->
        <!-- End left sidebar -->
        <!-- Begin book heading and table -->
        <div class="col-md-9">
            <div class="hadith-name-headline d-flex mb-3">
            <i class="fa fa-book fa-2x"></i>
            <h4>{{singleBook.book_name}}</h4>
            <p>( {{hadithCount | engToBen(hadithCount)}} টি  হাদিস )</p>
            </div>
            <table class="table book-list-table">
            <tbody>
                <tr v-for="(chapter, index) in chapters" :key="index">
                    <th class="text-center book-subject-no" scope="row" width="6%">{{chapter.chapter_no | engToBen(chapter.chapter_no)}}</th>
                    <td><router-link :to="{name:'chapters', params:{chapter_id:chapter.id}}">{{chapter.chapter_name}}</router-link></td>
                    <!-- <td class="text-right" width="20%">৪২২ - ৫৬৫</td> -->
                    <td v-if="chapter.hadith_no_begin != null || chapter.hadith_no_begin != null" class="text-right" width="37%">{{chapter.hadith_no_begin | engToBen(chapter.hadith_no_begin)}} - {{chapter.hadith_no_end | engToBen(chapter.hadith_no_end)}}</td>
                    <td v-else class="text-right" width="20%"> - </td>
                </tr>
            </tbody>
            </table>
        </div><!-- End book heading and table -->
        </div>
    </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
    components:{
        Sidebar
    },
    data(){
        return {
            singleBook:'',
            hadithCount:'',
            chapters:[]
        }
    },
    watch: {   
      //$route(to, from) {
      $route(){
        this.chapterList()
      }
    },
    methods:{
        chapterList() {
            axios
                .get("/bookpagedata/"+this.$route.params.book_id)
                .then(response => {
                    console.log(response.data.fetched_test);
                    this.singleBook = response.data.fetched_single_book;
                    this.hadithCount = response.data.fetched_hadith_count;
                    this.chapters = response.data.fetched_chapter;

                    // for (let chapter of response.data.fetched_chapter) {
                    //     this.beginHadithNo(chapter.id);
                    // }
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
        // beginHadithNo(chapterId) {
        //     axios
        //         .get("/book-page-begin-hadith-no/"+chapterId)
        //         .then(response => {
        //             this.hadith_no_begin = response.data.fetched_begin_hadith_no;
        //         })
        // },
  },
  mounted() {
    this.chapterList();
  }
}
</script>