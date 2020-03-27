import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  products: [{ name: String; price: Number }] = [{ name: "hello", price: 123 }];

  constructor() {}

  ngOnInit() {}
}
