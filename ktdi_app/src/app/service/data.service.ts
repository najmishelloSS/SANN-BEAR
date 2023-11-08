import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
const STORAGE_KEY='myList';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  private data = [];
 
  constructor(private router:Router,private storage:Storage) {
    this.init();
   }
 
  setData(id: string | number, data: any) {
    this.data[id] = data;
  }
 
  getData(id) {
    return this.data[id];
  }

  async init(){
    console.log('INIT');
    await this.storage.create();
    console.log('DONE');
  }

  getData1(){
    console.log('GET DATA');
    return this.storage.get(STORAGE_KEY) || []
  }

  async addData(item){
    console.log('ADD DATA');
    const storedData=await this.storage.get(STORAGE_KEY)|| [] ;
    storedData.push(item);
    return this.storage.set(STORAGE_KEY,storedData);
  }

  async updateData(item){
    console.log('UPDATE DATA');
    var storedData=await this.storage.get(STORAGE_KEY)|| [] ;
    storedData = item;
    return this.storage.set(STORAGE_KEY,storedData);
  }

  async removeItem(index){
    console.log('REMOVE DATA');
    const storedData=await this.storage.get(STORAGE_KEY)|| [] ;
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY,storedData);
 }
 
  async clearItem(){
    await this.storage.clear();
  }
}