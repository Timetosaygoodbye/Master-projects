<template>
  <div class="font-weight-bold">
    <b-navbar class="px-0" toggleable="lg">
      <b-navbar-brand>
        <a href="https://www.overwatchleague.com/en-us">
          <picture>
            <source
              media="(max-width: 720px)"
              srcset="https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/blt3af43e71e6120d5d/5cec5024578308e40945701a/mobile_logo.svg?auto=webp"
            />
            <img
              src="https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/blt76faeaf28d3357f0/5cec4d957b48be290a7f8408/logo.svg?auto=webp"
            />
          </picture>
        </a>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="schedule">SCHEDULE</b-nav-item>
          <b-nav-item to="standing">STANDING</b-nav-item>
          <b-nav-item to="stat">STAT</b-nav-item>
          <b-nav-item to="doc">API</b-nav-item>
          <b-nav-item to="about">ABOUT</b-nav-item>
          <b-nav-item href="https://shop.overwatchleague.com/">STORE</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-dropdown
            id="dropdown-form"
            text="My Account"
            ref="dropdown"
            variant="primary"
            class="m-0"
            @hide="hideUser"
          >
            <div v-if="getCurUserGroup == 'guest'">
              <b-dropdown-form>
                <b-form-group label="Username" label-for="dropdown-form-username">
                  <b-form-input size="sm" v-model="form.username" required></b-form-input>
                </b-form-group>

                <b-form-group label="Password" label-for="dropdown-form-password">
                  <b-form-input type="password" size="sm" v-model="form.password" required></b-form-input>
                </b-form-group>

                <b-form-invalid-feedback
                  class="mb-3"
                  :state="wrongUsernameOrPassword"
                >Wrong username or password</b-form-invalid-feedback>

                <b-form-invalid-feedback
                  class="mb-3"
                  :state="usernameExists"
                >Username already exists</b-form-invalid-feedback>

                <b-form-invalid-feedback class="mb-3" :state="weakPassword">
                  Password must contain:
                  <ul class="pl-3">
                    <li>at least 1 uppercase character</li>
                    <li>at least 1 lowercase character</li>
                    <li>at least 1 number</li>
                    <li>at least 1 special character</li>
                    <li>length between 8 to 16</li>
                  </ul>
                </b-form-invalid-feedback>

                <b-form-checkbox class="mb-3" v-model="form.rememberMe">Remember me</b-form-checkbox>

                <b-form-group :class="{'my-account-dropdown': $mq!='sm'}">
                  <b-button-group class="w-100">
                    <b-button class="w-100" variant="primary" size="sm" @click="login">Sign In</b-button>
                    <b-button
                      class="w-100 ml-1"
                      variant="primary"
                      size="sm"
                      @click="register"
                    >Sign Up</b-button>
                  </b-button-group>
                </b-form-group>
              </b-dropdown-form>
            </div>
            <div v-else>
              <b-dropdown-form>
                <div class="mb-2">Welcome, {{ getCurUser.username }}</div>
                <b-form-group :class="{'my-account-dropdown': $mq!='sm'}">
                  <b-button
                    class="w-100"
                    variant="primary"
                    size="sm"
                    @click="updateModal=true"
                  >My Info</b-button>
                  <b-button class="w-100 mt-2" variant="primary" size="sm" @click="signout">Sign Out</b-button>
                </b-form-group>
              </b-dropdown-form>
            </div>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal hide-header id="update-user-modal" v-model="updateModal" @hide="hideUpdateUser">
      <b-form>
        <b-form-group label="Username" label-for="dropdown-form-username">
          <b-form-input size="sm" v-model="getCurUser.username" disabled></b-form-input>
        </b-form-group>

        <b-form-group label="Key" label-for="dropdown-form-key">
          <b-form-input size="sm" v-model="getCurUserKey" disabled></b-form-input>
        </b-form-group>

        <b-form-group label="Old password" label-for="dropdown-form-old-password">
          <b-form-input type="password" size="sm" v-model="newForm.oldPassword" required></b-form-input>
        </b-form-group>

        <b-form-invalid-feedback class="mb-2" :state="wrongOldPassword">Old password is wrong</b-form-invalid-feedback>

        <b-form-group label="New password" label-for="dropdown-form-new-password">
          <b-form-input type="password" size="sm" v-model="newForm.password" required></b-form-input>
        </b-form-group>

        <b-form-invalid-feedback class="mb-2" :state="weakPassword">
          Password must contain:
          <ul class="pl-3">
            <li>at least 1 uppercase character</li>
            <li>at least 1 lowercase character</li>
            <li>at least 1 number</li>
            <li>at least 1 special character</li>
            <li>length between 8 to 16</li>
          </ul>
        </b-form-invalid-feedback>
      </b-form>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="primary" class="float-right ml-2" @click="updateUserInfo">Update</b-button>
          <b-button variant="outline-primary" class="float-right" @click="updateModal=false">Close</b-button>
        </div>
      </template>
    </b-modal>

    <b-modal hide-header v-model="registerSuccess">
      <div class="d-block text-center">
        <h3>Registration Success!</h3>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="outline-primary" class="float-right" @click="registerSuccess=false">OK</b-button>
        </div>
      </template>
    </b-modal>

    <b-modal hide-header v-model="updateSuccess">
      <div class="d-block text-center">
        <h3>Update Success!</h3>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="outline-primary" class="float-right" @click="hideUpdateSuccess">OK</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<style>
.my-account-dropdown > .dropdown-item {
  background: white;
  padding: 0px;
}
.my-account-dropdown {
  min-width: 200px;
}
.nav-item > a:hover {
  color: #ff8900 !important;
}
</style>
<style scoped>
.router-link-active {
  color: #ff8900 !important;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      updateModal: false,
      registerSuccess: false,
      updateSuccess: false,
      form: {
        username: "",
        password: "",
        rememberMe: false
      },
      newForm: {
        oldPassword: "",
        password: ""
      },
      wrongUsernameOrPassword: true,
      usernameExists: true,
      weakPassword: true,
      wrongOldPassword: true
    };
  },
  methods: {
    async login() {
      this.usernameExists = true;
      this.weakPassword = true;
      this.wrongUsernameOrPassword = true;
      await this.$api
        .post("/api/login", this.form)
        .then(res => {
          let user = { ...this.form, ...res.data };
          this.$store.dispatch("updateCurUser", user);
          this.updateSessionStorage(user);
          if (this.form.rememberMe) {
            this.updateLocalStorage(user);
          }
          location.reload();
          return false;
        })
        .catch(err => {
          if ("response" in err && err.response.status == 401) {
            this.wrongUsernameOrPassword = false;
          } else {
            console.log(err);
          }
        });
    },
    async register() {
      this.usernameExists = true;
      this.weakPassword = true;
      this.wrongUsernameOrPassword = true;
      if (!this.validatePassword(this.form.password)) {
        this.weakPassword = false;
      } else {
        await this.$api
          .post("/api/register", this.form)
          .then(res => {
            this.registerSuccess = true;
          })
          .catch(err => {
            if ("response" in err && err.response.status == 409) {
              this.usernameExists = false;
            } else {
              console.log(err);
            }
          });
      }
    },
    async signout() {
      await this.$api
        .get("/api/guest")
        .then(res => {
          this.$store.dispatch("updateCurUser", res.data);
          this.updateSessionStorage(res.data);
          this.form = {
            username: "",
            password: "",
            rememberMe: false
          };
          location.reload();
          return false;
        })
        .catch(err => console.log(err));
    },
    async updateUserInfo() {
      this.wrongOldPassword = true;
      if (this.newForm.oldPassword != this.getCurUser.password) {
        this.wrongOldPassword = false;
        return;
      }
      this.weakPassword = true;
      if (!this.validatePassword(this.newForm.password)) {
        this.weakPassword = false;
      } else {
        await this.$api
          .put("/api/register", {
            key: this.getCurUserKey,
            password: this.newForm.password
          })
          .then(res => {
            let user = { ...this.getCurUser };
            user.password = this.newForm.password;
            user.key = res.data.key;
            this.$store.dispatch("updateCurUser", user);
            this.updateSessionStorage(user);
            if (typeof Storage !== undefined) {
              if (JSON.parse(localStorage.getItem("user"))) {
                this.updateLocalStorage(user);
              }
            }
            this.updateSuccess = true;
          })
          .catch(err => {
            if ("response" in err && err.response.status == 403) {
              console.log(err.response);
            } else {
              console.log(err);
            }
          });
      }
    },
    updateSessionStorage(user) {
      if (typeof Storage !== undefined) {
        sessionStorage.clear();
        sessionStorage.setItem("user", JSON.stringify(user));
      }
    },
    updateLocalStorage(user) {
      if (typeof Storage !== undefined) {
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    validatePassword(p) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        p
      );
    },
    hideUpdateUser() {
      this.newForm = { oldPassword: "", password: "" };
    },
    hideUser() {
      this.usernameExists = true;
      this.weakPassword = true;
      this.wrongUsernameOrPassword = true;
      this.form = {
        username: "",
        password: "",
        rememberMe: false
      };
    },
    hideUpdateSuccess() {
      this.newForm = { oldPassword: "", password: "" };
      this.updateSuccess = false;
    }
  },
  computed: {
    ...mapGetters(["getCurUser", "getCurUserGroup", "getCurUserKey"]),
    ...mapActions(["updateCurUser"])
  }
};
</script>