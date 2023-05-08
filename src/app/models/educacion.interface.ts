export class Educacion {
  id: number;
  school: string;
  title: string;
  img: string;
  career: string;
  start: string;
  end: string;
  
  constructor(id: number, school: string, title: string, img: string, career: string, start: string, end: string) {
    this.id = id;
    this.school = school;
    this.title = title;
    this.img = img;
    this.career = career;
    this.start = start;
    this.end = end;
  }
}