<template>
    <div class="container">
    <div class="row">
      <!-- Begin left sidebar -->
      <Sidebar/>
      <!-- End left sidebar -->
      <!-- Begin book heading and chapter -->
      <div class="col-md-9">
        <div class="hadith-name-headline d-flex mb-3">
          <i class="fa fa-book fa-2x"></i>
          <h4>{{singleBook.book_name}}</h4>
          <p>( {{hadithCount}} টি  হাদিস )</p>
        </div>
        <div class="box-two mb-3">
          <div class="card">
            <div class="card-body">
              <div class="chapter-no">
                {{singleChapter.id}}
              </div>
              <div class="chapter-name">
                <span><b>{{singleChapter.chapter_name}}</b></span>
              </div>
              <div class="hadis-from-to">
                {{singleChapter.hadith_no_begin}} - {{singleChapter.hadith_no_end}}
              </div>
            </div>
          </div>
        </div>
        <div v-for="(hadith, index) in hadiths" :key="index" class="single-hadith-box mb-3">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="box-three d-flex">
                        <i class="fa fa-book-open fa-2x"></i>
                        <h6>{{singleChapter.id}}/{{index+1}} অধ্যায়ঃ</h6>
                    </div>
                    <p class="chapter-subject">{{hadith.hadith_subject}}</p>
                    <p class="chapter-subject-details">{{hadith.hadith_subject_details}}</p>
                </div>
            </div>
            <!-- <div v-if="hadith.hadith_no != null && hadith.hadith_name_ar != null && hadith.narrated_by != null && hadith.hadith_name_bn != null && hadith_value != null" class="card"> -->
            <div v-if="hadith.hadith_no != null && hadith.hadith_name_ar != null && hadith.narrated_by != null && hadith.hadith_name_bn != null" class="card">
                <div class="card-body">
                    <div class="box-four">
                        <div class="single-hadith d-flex">
                            <i class="far fa-sun"></i>
                            <h6>{{hadith.hadith_no}}</h6>
                        </div>
                        <p class="hadith-in-arabic">{{hadith.hadith_name_ar}}</p>
                        <p class="hadith-narrated">{{hadith.narrated_by}}</p>
                        <p class="hadith-in-bengali">{{hadith.hadith_name_bn}}</p>
                        <div class="hadith-footer">
                            <div class="hadith-value-text">
                                <p>হাদিসের মানঃ</p>
                            </div>
                            <div v-if="hadith.hadith_value == 1" class="hadith-value-sahi">
                                সহীহ হাদিস
                            </div>
                            <div v-if="hadith.hadith_value == 2" class="hadith-value-other">
                                অন্যান্য
                            </div>
                            <div class="direct-hadith-link">
                                <!-- <a href="#"><i class="fa fa-external-link-alt"></i> সরাসরি</a> -->
                                <router-link :to="{name:'single-hadith', params:{hadith_id:hadith.id}}"><i class="fa fa-external-link-alt"></i> সরাসরি</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div><!-- End book heading and chpater -->
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
          hadithCount:null,
          singleChapter:'',
          hadiths:[]
        }
    },
    methods:{
        hadithList() {
            axios
                .get("/chapterpagedata/"+this.$route.params.chapter_id)
                .then(response => {
                  this.singleBook = response.data.fetched_single_book;
                  this.hadithCount = response.data.fetched_hadith_count;
                  this.singleChapter = response.data.fetched_single_chapter;
                  this.hadiths = response.data.fetched_hadith;
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
  
  },
  mounted() {
    this.hadithList();
  }
}
</script>