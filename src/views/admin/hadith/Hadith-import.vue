<template>
  <div>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-primary">
              <div class="card-header">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Hadiths Import</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="proceedAction()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label class="form-control-label"  for="input-file-import">Upload Excel File</label>
                      <input type="file" class="form-control" :class="{ ' is-invalid' : error.message }" id="input-file-import" name="file_import" ref="import_file"  @change="onFileChange">
                      <div v-if="error.message" class="invalid-feedback"></div>
                    </div>
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-file-upload"></i> Import
                  </button>
                </div>
              </form>
            <!-- /.form -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        error: {},
        import_file: '',
        books:[]
      }
    },
    methods: {
      onFileChange(e) {
        this.import_file = e.target.files[0];
    },
    proceedAction() {
        let formData = new FormData();
        formData.append('import_file', this.import_file);
          axios.post('/hadiths/import', formData, {
              headers: { 'content-type': 'multipart/form-data' }
            })
            .then(response => {
                if(response.status === 200) {
                  iziToast.success({
                  title: "OK",
                  message: "Successfully inserted hadith from file!",
                  position: 'topRight',
                  timeout: 3000
                });
                this.$router.push({ name: 'hadith-list' });
                  // codes here after the file is upload successfully
                }
            })
            .catch(error => {
                // code here when an upload is not valid
                this.uploading = false
                this.error = error.response.data
                console.log('check error: ', this.error)
            });
        },
      }
  }
</script>