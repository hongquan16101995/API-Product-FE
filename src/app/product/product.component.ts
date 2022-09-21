import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Category} from "../model/category";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = []
  categories: Category[] = []
  formCreate!: FormGroup
  productUpdate!: Product

  constructor(private productService: ProductService,
              private formGroup: FormBuilder,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formCreate = this.formGroup.group({
      name: [""],
      price: [""],
      amount: [""],
      category: [""],
    })
    this.productService.findAll().subscribe(data => {
      this.products = data
    })
    this.productService.findAllCategory().subscribe(data => {
      this.categories = data
    })
  }

  createProduct() {
    let product = {
      name: this.formCreate.value.name,
      price: this.formCreate.value.price,
      amount: this.formCreate.value.amount,
      category: {
        id: this.formCreate.value.category
      }
    }
    this.productService.create(product).subscribe(() =>{
      this.ngOnInit()
    })
  }

  update(id?: number) {
    this.productService.findOne(id).subscribe(data => {
      this.productUpdate = data
      this.formCreate.patchValue(this.productUpdate)
    })
  }

  updateProduct() {
    let cateId
    if (this.formCreate.value.category == undefined) {
      cateId = this.productUpdate.id
    } else {
      cateId = this.formCreate.value.category
    }
    let product = {
      name: this.formCreate.value.name,
      price: this.formCreate.value.price,
      amount: this.formCreate.value.amount,
      category: {
        id: cateId
      }
    }
    this.productService.create(product).subscribe(() =>{
      this.ngOnInit()
    })
  }

}
