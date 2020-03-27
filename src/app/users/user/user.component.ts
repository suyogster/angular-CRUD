import { UserService } from "./../../shared/user.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor(
    private service: UserService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      id: null,
      fullname: "",
      contact: null,
      address: "",
      email: "",
      admin: null
    };
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id === null) {
      this.firestore.collection("users").add(data);
      this.toastr.success(`Succesfully Added`, "User Registration");
    } else {
      this.firestore.doc("users/" + form.value.id).update(data);
      this.toastr.success(
        `Succesfully Updated ${form.value.fullname}`,
        "User Registration"
      );
    }
    this.resetForm(form);
  }
}
