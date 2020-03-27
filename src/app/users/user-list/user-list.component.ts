import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";
import { UserService } from "./../../shared/user.service";
import { User } from "./../../shared/user.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  list: User[];
  constructor(
    private service: UserService,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.service.getUser().subscribe(user => {
      this.list = user.map(item => {
        let id = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { id, ...(data as {}) } as User;
      });
    });
    console.log("user list", this.list);
  }

  onEdit(user: User) {
    this.service.formData = Object.assign({}, user);
  }

  onDelete(id: string) {
    if (confirm("Are you sure you want to delete?")) {
      this.firestore.doc("users/" + id).delete();
      this.toastr.warning("User Deleted Succesfully", "User Register");
    } else {
      this.toastr.info("User Deletion Unsucessfull", "User Registration");
    }
  }
}
