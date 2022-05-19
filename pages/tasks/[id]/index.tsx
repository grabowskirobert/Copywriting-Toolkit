import { useRouter } from "next/router";
import CustomButton from "../../../components/CustomButton";
import privateRoute from '../../../components/privateRoute';
import { db } from "../../../firebase/firebase";
import { getDoc, doc, updateDoc } from "@firebase/firestore";
import {  useEffect, useState } from "react";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import Head from "next/head";

// interface WithRouterProps {
//   router: NextRouter
// }

// interface MyEditorProps extends WithRouterProps {}

// type MyState = {
//   editorState: any;
//   data: any;
//   content: string;
//   test: string;
// }

// class MyEditor extends Component<MyEditorProps, MyState> {
//   constructor(props:any) {
//     super(props);
//     this.updateTask = this.updateTask.bind(this);
//     this.handleSave = this.handleSave.bind(this);

//     this.state = {
//       content: '',
//       data: null,
//       editorState: EditorState.createEmpty(),
//       test: '{"blocks":[{"key":"8srtm","text":"sdfdsf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
//     };
//     this.handleKeyCommand = this.handleKeyCommand.bind(this);
//   }


//   onChange = (editorState:any) => this.setState({editorState});

//   handleKeyCommand(command:any, editorState:any) {
//     const newState = RichUtils.handleKeyCommand(editorState, command);

//     if (newState) {
//       this.onChange(newState);
//       return 'handled';
//     }

//     return 'not-handled';
//   }

//   async handleSave() {
//     this.setState({
//       content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
//     })  
//   }

//   componentDidMount() {
//     console.log("Fetch task id: ",this.props.router.query.id)

//     const fetchTask = async (task_id:any) => {
//       const taskDoc = doc(db, "task", task_id);
//       const data:any = await getDoc(taskDoc);
//       const task = data.data();
//       if(task.content) {
//         this.setState({
//           content: task.content
//         })
//         console.log(this.state.content)
//       } else {
//         console.log('empty content')
//       }
//     }

//     // this?.state.content !==  '' ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.content))): 

//    const init = async () => {
//     await fetchTask(this.props.router.query.id);

//     if(this.state.content) {
//       EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.content)))
//     }
//    }

//    init();
//   }

//   updateTask = async (task_id:any,body:any) => {
//     console.log(body)
//     const taskDoc = doc(db, "task", task_id);
//     await updateDoc(taskDoc,{'content':body});
//     console.log('update')

// }

//   _onBoldClick() {
//     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
//   }
//   _onItalicClick() {
//     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
//   }
//   _onUnderlineClick() {
//     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
//   }


//   render() {

//     return (
//       <div>
//         <p>Editor JS </p>
//         <CustomButton customFunction={this._onBoldClick.bind(this)}>Bold</CustomButton>
//         <CustomButton customFunction={this._onItalicClick.bind(this)}>Italic</CustomButton>
//         <CustomButton customFunction={this._onUnderlineClick.bind(this)}>Underline</CustomButton>
//         <br />
//         <Editor
//         editorState={this.state.editorState}
//         handleKeyCommand={this.handleKeyCommand}
//         onChange={this.onChange}
//       />
//       <CustomButton customFunction={this.handleSave}>Save</CustomButton>
//       <CustomButton customFunction={()=>this.updateTask(this.props.router.query.id,this.state.content)}>Show</CustomButton>
//       </div>
//     );
//   }
// }

// const routerHOC = withRouter(MyEditor);

function MyEditor() {
  const router = useRouter();
  const taskId:any = router.query.id;
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const handleKeyCommand = (command: string, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  const updateTask = async (task_id: string) => {
    const taskDoc = doc(db, "task", task_id);
    await updateDoc(taskDoc, { 'content': JSON.stringify(convertToRaw(editorState.getCurrentContent())) });
    console.log('update')

  }

  useEffect(() => {
    console.log("Fetch task id: ", taskId)

    const fetchTask = async (task_id: string) => {
      const taskDoc = doc(db, "task", task_id);
      const data: any = await getDoc(taskDoc);
      const task = data.data();
      if (task.content) {
        setEditorState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(task.content))))
      } else {
        console.log('empty content')
      }
    }

    fetchTask(taskId.toString());
  }, [])


  // const _onBoldClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  // }
  // const _onItalicClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  // }
  // const _onUnderlineClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  // }
  function uploadImageCallBack(file:string) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }

  return <div>
    <Head>
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css' />
    </Head>
    <CustomButton customFunction={()=>router.back()}>Return</CustomButton>
    <br />
    {/* <CustomButton customFunction={_onBoldClick}>BOLD</CustomButton>
    <CustomButton customFunction={_onItalicClick}>ITALIC</CustomButton>
    <CustomButton customFunction={_onUnderlineClick}>UNDERLINE</CustomButton> */}
    <br />
    <br />
    <Editor 
    editorState={editorState} 
    onEditorStateChange={setEditorState} 
    handleKeyCommand={handleKeyCommand}
    toolbar={{
      inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
      image: {
        uploadCallback: uploadImageCallBack,
        alt: { present: true, mandatory: true }
      }
    }}
    />
    <br />
    <CustomButton customFunction={() => updateTask(taskId)}>Save</CustomButton>
  </div>
}

export default privateRoute(MyEditor);