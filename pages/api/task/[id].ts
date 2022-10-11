import {NextApiRequest, NextApiResponse} from "next";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../../../firebase/firebase";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {

    const {id} = req.query;

    const id_test:string | string[]  = id;

    async function fetchTask() {
        if (typeof id_test === "string") {
            const taskDoc = doc(db, 'task', id_test)
            const data: any = await getDoc(taskDoc)
            const task = data.data()

            return task.html
        }
    }
    const taskBody = await fetchTask();


    // const Template = {
    //     container: (production:string) => `<div class="Container">${production}</div>`,
    //     column2X: (element:Array<any>) => `<div class="Container">${element[0].production} ${element[1].production}</div>`,
    //     column3X: (production:string) => `<div class="Column3X">${production}</div>`,
    // }

    // const testHtml = `
    //
    // ${Template.container(taskBody[0].container.production)}
    // ${Template.column2X(taskBody[1].column2X)}
    //
    // `

    // taskBody.forEach((el:any) => {
    //         console.log(el.hasOwnProperty('container'))
    // })


    res.status(200).send( taskBody );
}