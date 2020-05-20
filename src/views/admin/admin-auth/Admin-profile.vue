<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div>
          <div class="d-flex justify-content-between">
            <div>
              <h1>Profile</h1>
            </div>
            <div>
              <button
                @click="$router.go(-1)" class="btn btn-outline-secondary btn-sm d-inline-block mr-1">
                <i class="fas fa-arrow-left"></i> Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="profile-user-img img-fluid img-circle" :src="userPhotoFind()" alt="User profile picture" />
                </div>
                <h3 class="profile-username text-center">{{loggedInAdminUser.name}}</h3>
                <p v-if="loggedInAdminUser.user_role == 1" class="text-muted text-center">Super Admin</p>
                <p v-if="loggedInAdminUser.user_role == 2" class="text-muted text-center">Admin</p>
                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Name:</b>
                    <a class="float-right">{{loggedInAdminUser.name}}</a>
                  </li>
                  <li class="list-group-item">
                    <b>Email:</b>
                    <a class="float-right">{{loggedInAdminUser.email}}</a>
                  </li>
                </ul>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card" style="width:50%">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a class="nav-link active" href="#home" data-toggle="tab">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#other" data-toggle="tab">Other</a>
                  </li>
                </ul>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="active tab-pane" id="home">
                    <!-- Post -->
                    <div class="post">
                      <ul class="list-group list-group-unbordered mb-3">
                        <li class="list-group-item">
                          <b>Name:</b>
                          {{loggedInAdminUser.name}}
                        </li>
                        <li class="list-group-item">
                          <b>Email:</b>
                          {{loggedInAdminUser.email}}
                        </li>
                      </ul>
                    </div>
                    <!-- /.post -->
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="other">
                    <p>Other content here</p>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
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
      loggedInAdminUser: [],
      form: new Form({
        name: "",
        email: ""
      }),
      loggedInUserPhoto:null
    };
  },
  methods: {
    getLoggedInAdminUser() {
      //axios.defaults.baseURL = 'http://localhost/laraapiskel/public/';
      axios
        .get("/user")
        .then(response => {
          this.loggedInAdminUser = response.data;
          this.loggedInUserPhoto = response.data.user_photo;
        })
        .catch(error => {
        });
    },
    userPhotoFind(){
      if(this.loggedInUserPhoto == null){
        return uploadPath + "defaultImage/noimage.png";
      }
      else{
        return uploadPath+"userPhoto/"+this.loggedInUserPhoto;
      }
    },
  },
  mounted() {
    this.getLoggedInAdminUser();
  }
};
</script>