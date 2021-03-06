import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Reviews.css';
import { bindActionCreators } from 'redux'
import { authenticate } from '../../actions/authenticate'
import { setPermissions } from '../../actions/setPermissions'
import { getUserInfo } from '../../actions/getUserInfo'
import { getAllReviews } from '../../actions/getAllReviews'
import { updateReview } from '../../actions/updateReview'
import { postReview } from '../../actions/postReview'
import { deleteReview } from '../../actions/deleteReview'
import { getFile } from '../../actions/getFile'
import { clearFiles } from '../../actions/clearFiles'
import { removeFile } from '../../actions/removeFile'
import { setPostCompleteFalse } from '../../actions/setPostCompleteFalse'
import { setUpdateCompleteFalse } from '../../actions/setUpdateCompleteFalse'
import { setDeleteCompleteFalse } from '../../actions/setDeleteCompleteFalse'
import { setRemoveFileCompleteFalse } from '../../actions/setRemoveFileCompleteFalse'
import { postAnswers } from '../../actions/postAnswers'
import OFF from '../OFF/OFF'
import SubHeader from '../SubHeader/SubHeader'
import { Icon, Input, Section, Row, Col, Button, Collapsible, CollapsibleItem, Modal } from 'react-materialize'
import { Redirect } from 'react-router-dom'





class Reviews extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toolNameInputValue: 'MEADE/SORT-OE',
            textInputValue: '',
            editToolNameInputValue: 'MEADE/SORT-OE',
            editTextInputValue: '',
            editPublicIsChecked: "",
            fileInputValue: null,
            editFileInputValue: null,
            fileTypePasses: true,
            editFileTypePasses: true,
            postStarted: false,
            publicIsChecked: true,
            rangeValue: 50,
            editRangeValue: 50,
            editAnswer_1_value: "",
            editAnswer_2_value: "",
            editAnswer_3_value: "",
            editAnswer_4_value: "",
            editAnswer_5_value: "",
            intType: "NOT SPECIFIED",
            editIntType: "",
            reviewIdBeingEdited: null
        }

        this.myRef = React.createRef()
    }

    onCheckSlack = () => this.setState({...this.state, slackIsChecked: !this.state.slackIsChecked})


    componentWillMount = () => {
        this.props.authenticate().then(r => r).catch(err => err)
        this.props.getUserInfo().then(r => this.props.setPermissions(r.payload.role)).catch(err => err)
        this.props.getAllReviews().then(r => {
            if(!this.props.allReviews || this.props.allReviews.length < 1) {this.props.clearFiles()}
            else {
                this.props.allReviews.map((review, i) => {
                    if(this.props.files && (this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                           return this.props.getFile(review.path.substring(15), review.id)
                        }
                })
            }
        })
    }

    componentDidUpdate = () => {
        if(this.props.postComplete || this.props.deleteComplete || this.props.updateComplete || this.props.removeFileComplete) {
            if (this.props.postComplete ) this.setState({...this.state, postStarted: false })
            this.props.clearFiles()
            this.props.getAllReviews().then(r => {
                if(this.props.allReviews.length > 0) {
                    this.props.postAnswers(this.props.sortoeAnswerInputs,
                        this.props.allReviews[this.props.allReviews.length - 1].tool_name,
                        this.props.allReviews[this.props.allReviews.length - 1].id, this.props.allReviews[this.props.allReviews.length - 1].int_type)
                }
                this.props.allReviews.map((review, i) => {
                    if(this.props.files && (this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                            this.props.getFile(review.path.substring(15), review.id)
                    }
                })
            })

            if (this.props.files.length == this.props.allReviews.filter(review => review.path).length) {
                this.props.setPostCompleteFalse()
                this.props.setUpdateCompleteFalse()
                this.props.setDeleteCompleteFalse()
                this.props.setRemoveFileCompleteFalse()
            }
        }
    }

    updateInputValue(evt, inputType) {
        // IF THE INPUT DOES NOT CONAINT FILES THE FOLLOWING WILL EXECUTE
        if(inputType != "fileInputValue" && inputType != "editFileInputValue" && inputType !== 'editPublicIsChecked' ){
            return this.setState({
              [inputType]: evt.target.value
            })
        } else if (inputType == 'editPublicIsChecked') {
            return this.setState({
                [inputType]: evt.target.checked
              })
        }
        // IF THE INPUT DOES CONTAIN FILES THE FOLLOWING WILL EXECUTE
        else {
            if(evt.target.files[0] == undefined){
                this.setState({
                    [inputType]: null
                })
            }

            if(Array.from(evt.target.files).length > 0){
                const f = evt.target.files[0].type
                const lastSlashIndex = (f).lastIndexOf('/') + 1
                const type = f.substring(lastSlashIndex).trim()
                // IF THE FILE INPUT CONTAINS A FILE THAT ISN'T A PICTURE OR A PDF or IF THE PICTURE OR PDF HAS UPPERCASE EXTENSION...
                if((type != 'jpg' &&
                   type != 'jpeg' &&
                   type != 'png' &&
                   type != 'pdf' &&
                   type != 'JPG' &&
                   type != 'JPEG' &&
                   type != 'PNG' &&
                   type != 'PDF' )
                   ||
                   (
                    evt.target.files[0].name.slice(-3) == 'JPG' ||
                    evt.target.files[0].name.slice(-3) == 'JPEG' ||
                    evt.target.files[0].name.slice(-3) == 'PNG' ||
                    evt.target.files[0].name.slice(-3) == 'PDF'
                   )

                   ){
                    // NEW FILE OR EDITING A FILE?
                    if(inputType == "fileInputValue"){
                        this.setState({
                            ...this.state,
                            fileTypePasses: false
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            editFileTypePasses: false
                        })
                    }
                }
                // THE INPUT HAS THE TYPE OF FILE AND ALSO HAS THE CORRECT TYPE OF FILE
                else {
                    // NEW FILE OR EDITING A FILE?
                    if(inputType == "fileInputValue"){
                        this.setState({
                            ...this.state,
                            fileTypePasses: true,
                            [inputType]: evt.target.files[0]
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            editFileTypePasses: true,
                            [inputType]: evt.target.files[0]
                        })
                    }
                }
            }
        }
    }

  deleteHandler = (id) => {
    this.props.deleteReview(id)
    this.props.getAllReviews().then(r => {
        if(this.props.allReviews.length < 1){
            this.props.clearFiles()
        }
    })
  }


  toggleEditSaveHandler = (editable, toolName, reviewId,
                            text, path, sharable, rating,
                            answer_1, answer_2, answer_3,
                            answer_4, answer_5, int_type) => {
    // Edit has already been open, now time to save the updates.
    let updateObject = {}
    if(editable) {
         updateObject = {
            toolName: this.state.editToolNameInputValue,
            textInput: this.state.editTextInputValue,
            reviewId,
            blob: this.state.editFileInputValue,
            sharable: this.state.editPublicIsChecked,
            rating: this.state.editRangeValue,
            answer_1: this.state.editAnswer_1_value,
            answer_2: this.state.editAnswer_2_value,
            answer_3: this.state.editAnswer_3_value,
            answer_4: this.state.editAnswer_4_value,
            answer_5: this.state.editAnswer_5_value,
            int_type: this.state.editIntType
        }
        this.props.updateReview(updateObject)
        .then(res => {
            this.props.getAllReviews().then(r => {
                this.props.allReviews.map(review => {
                    if(review.path && updateObject.hasOwnProperty('blob')){
                        return this.props.getFile(review.path.substring(15), review.id)
                    }
                })
            })
        })
        this.setState({
            ...this.state,
            reviewIdBeingEdited: null,
            editFileInputValue: null
        })
    }
    // Edit has NOT already been open, now time to update the fields.
    else {
        this.setState({
            ...this.state,
            editToolNameInputValue: toolName,
            editTextInputValue: text,
            editPublicIsChecked: sharable,
            editRangeValue: rating,
            editAnswer_1_value: answer_1 || "",
            editAnswer_2_value: answer_2 || "",
            editAnswer_3_value: answer_3 || "",
            editAnswer_4_value: answer_4 || "",
            editAnswer_5_value: answer_5 || "",
            editIntType: int_type,
            reviewIdBeingEdited: reviewId
        })
    }
}

  postReviewHandler = async () => {
    this.setState({
        ...this.state,
        postStarted: true
    })

    this.props.postReview(
        this.state.toolNameInputValue,
        this.state.textInputValue,
        this.state.fileInputValue,
        localStorage.getItem('username'),
        this.state.publicIsChecked,
        this.props.firstName,
        this.props.lastName,
        this.props.jobTitle,
        this.props.company,
        this.state.rangeValue,
        this.props.sortoeAnswerInputs,
        this.state.intType
    )
    this.setState({
        toolNameInputValue: 'MEADE/SORT-OE',
        textInputValue: "",
        fileInputValue: null,
        intType: "NOT SPECIFIED"
    })


    let lastReview = this.refs.lastReview
    if (this.props.allReviews.length > 0) lastReview.scrollIntoView({behavior: "smooth"})
  }


  openAttachment = (base64, canvasId, isPDF) => {
    if(isPDF){
        const pdfData = atob(base64);
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
        const PDFJS = pdfjsLib;
        const canvasContainer = document.getElementById(`${canvasId}-container`)
        canvasContainer.innerHTML = ""

        function renderPage(page) {
            var viewport = page.getViewport(1.4);
            const canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };

            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvasContainer.appendChild(canvas);

            page.render(renderContext);
        }

        function renderPages(pdfDoc) {
            for(var num = 1; num <= pdfDoc.numPages; num++)
                pdfDoc.getPage(num).then(renderPage);
        }
        PDFJS.disableWorker = true;
        PDFJS.getDocument({data: pdfData}).then(renderPages);


    }
  }

  removeFileHandler = reviewId => {
    this.props.removeFile(reviewId)
  }

  applyColor = rangeValue => {
      return rangeValue >= 0 && rangeValue <= 59 ? "F" :
      rangeValue >= 60 && rangeValue <= 69 ? "D" :
      rangeValue >= 70 && rangeValue <= 79 ? "C" :
      rangeValue >= 80 && rangeValue <= 89 ? "B" : "A"
  }

  onCheckPublic = () => this.setState({...this.state, publicIsChecked: !this.state.publicIsChecked})

  render() {
    if(!this.props.username){
        return <Redirect to="/" />
      } else {
      return (
        <div>
          {/* ////////////////////  ///////   ///////////////////////// */}
          {/* ////////////////////  HEADER    ///////////////////////// */}
          {/* ////////////////////  ///////   ///////////////////////// */}
          <SubHeader icon={require("../../assets/assessment_icon.png")} subHeader="My Assessments"/>

          {/* ////////////////////  ////////////////////////////////////////////   ///////////////////////// */}
          {/* ////////////////////  ARE THERE EXISTING REVIEWS? IF SO, SHOW HERE   ///////////////////////// */}
          {/* ////////////////////  ////////////////////////////////////////////   ///////////////////////// */}
            {
            this.props.allReviews && this.props.allReviews.length > 0 ?
            this.props.allReviews.map((review, i) => {
              return (
                <Section key={review.id} className="reviews-wrapper center review-underline-wrapper">
                  <Row className={`c-item `}>
                    <Col s={2}>
                      {
                        review.id === this.state.reviewIdBeingEdited ?
                        <Row>
                            <Input
                            s={12}
                            type='select'
                            label="Choose A Tool"
                            value={this.state.editToolNameInputValue}
                            onChange={evt => this.updateInputValue(evt, 'editToolNameInputValue')}>
                                <option value='MEADE/SORT-OE'>MEADE/SORT-OE</option>
                                <option value='Argument Mapper'>Argument Mapper</option>
                                <option value='Attack the Network'>Attack the Network</option>
                                <option value='SOF4D'>SOF4D</option>
                            </Input>
                            <Input
                            s={12}
                            type='select'
                            label="Your Background"
                            value={this.state.editIntType}
                            onChange={evt => this.updateInputValue(evt, 'editIntType')}>
                                <option value='NOT SPECIFIED'>NOT SPECIFIED</option>
                                <option value='HUMINT'>HUMINT</option>
                                <option value='SIGINT'>SIGNINT</option>
                                <option value='GEOINT'>GEOINT</option>
                                <option value='MASINT'>MASINT</option>
                                <option value='OSINT'>OSINT</option>
                                <option value='CYBINT/DNINT'>CYBINT/DNINT</option>
                                <option value='FININT'>FININT</option>
                                <option value='TECHINT'>TECHINT</option>
                                <option value='OTHER'>OTHER</option>
                            </Input>
                        </Row>
                        :
                        <h6 ref={(i + 1) == this.props.allReviews.length ? "lastReview" : null} className="tool-name">{review.tool_name}</h6>
                      }
                    </Col>
                    <Col s={6}>
                            {
                            review.id === this.state.reviewIdBeingEdited ?
                            <Row>
                                <Collapsible>
                                    <CollapsibleItem id="edit-results-collapsible" header="Edit Questionaire Results" icon="expand_more">
                                    {this.props.OFFquestions.map((question, i) => (
                                        <Row key={i} className="border-bottom valign-wrapper min-width-100 edit-results-item">
                                            <Col s={1}>{question.questionID}</Col>
                                            <Col s={7}>
                                                <span className="uppercase-light-font">{question.question}</span>
                                            </Col>
                                            <Col s={4}>
                                                <Input
                                                s={12}
                                                type='select'
                                                value={this.state[`editAnswer_${question.questionID}_value`]}
                                                onChange={evt => this.updateInputValue(evt, `editAnswer_${question.questionID}_value`)}>
                                                    <option value='Strongly Disagree'>Strongly Disagree</option>
                                                    <option value='Disagree'>Disagree</option>
                                                    <option value='Indifferent'>Indifferent</option>
                                                    <option value='Agree'>Agree</option>
                                                    <option value='Strongly Agree'>Strongly Agree</option>
                                                </Input>
                                            </Col>
                                        </Row>
                                    ))}
                                    </CollapsibleItem>
                                </Collapsible>
                                <Input
                                s={12}
                                onChange={evt => this.updateInputValue(evt, 'editTextInputValue')}
                                disabled={false}
                                type='textarea'
                                value={this.state.editTextInputValue}
                                placeholder={review.text.length < 1 ? "Add A Comment Here..." : null} />
                            </Row>
                            :
                            <Row>
                                <Collapsible>
                                    <CollapsibleItem id="view-results-collapsible" header="View Questionaire Results" icon="expand_more">
                                    {this.props.OFFquestions.map((question, i) => (
                                        <Row key={i} className="border-bottom valign-wrapper min-width-100 view-results-item">
                                            <Col s={1}>{question.questionID}</Col>
                                            <Col s={7}>
                                                <span className="uppercase-light-font">{question.question}</span>
                                            </Col>
                                            <Col s={4}>
                                                <span className="uppercase-bold-font">{review[`answer_${question.questionID}`]}</span>
                                            </Col>
                                        </Row>
                                    ))}
                                    </CollapsibleItem>
                                </Collapsible>

                                {review.text.length > 0 ?
                                <Input s={12}  disabled={true} type='textarea' defaultValue={review.text} />
                                :
                                null}
                            </Row>
                            }
                        {
                            review.id === this.state.reviewIdBeingEdited ?
                                <Row>
                                    {
                                    this.state.editFileInputValue && this.state.editFileTypePasses ?
                                        this.state.editFileInputValue.type.substring(0, 5) !== 'image' ?
                                        <Row className="valign-wrapper">
                                            <Col s={7} className="non-image-file file" >
                                                {this.state.editFileInputValue.name}
                                                {this.state.editFileInputValue.type}
                                                <Icon small className="data icon-green">check_circle_outline</Icon>
                                            </Col>
                                            <Col s={5}>
                                                <Button onClick={() => this.setState({ ...this.state, editFileInputValue: null })} className="portal-buttons delete-button" waves='light'> Cancel <Icon right tiny className="data">delete_outline</Icon></Button>
                                            </Col>
                                        </Row>
                                        :
                                        <Row className="valign-wrapper">
                                            <Col s={7}>
                                                <img alt="upload-file" className="file"  src={window.URL.createObjectURL(this.state.editFileInputValue)} />
                                            </Col>
                                            <Col s={5}>
                                                <Button onClick={() => this.setState({ ...this.state, editFileInputValue: null })} className="portal-buttons delete-button" waves='light'> Cancel <Icon right tiny className="data">delete_outline</Icon></Button>
                                            </Col>
                                        </Row>
                                    :
                                    <Row>
                                        <Input
                                        className="already-posted"
                                        type="file"
                                        label={review.path ? <span>Replace<Icon right tiny  className="data">cloud_upload</Icon></span> : <span>Upload<Icon right tiny  className="data">cloud_upload</Icon></span>}
                                        name="fileUpload"
                                        s={12}
                                        placeholder={`${review.path ? review.path : `(.jpg/.png/.jpeg) or a .pdf.`}`}
                                        onChange={evt => this.updateInputValue(evt, 'editFileInputValue')} />
                                    </Row>
                                    }
                                </Row>
                            :
                                null
                        }
                        {
                            !this.state.editFileTypePasses && (review.id === this.state.reviewIdBeingEdited) ?
                            <div>
                                <div className="error-text">File must be a picture(.jpg/.png/.jpeg) or a .pdf.</div>
                                <div className="error-text">Please ensure file extensions are all lowercase.</div>
                            </div>
                            :
                            null
                        }
                    </Col>
                    <Col s={4} className="center">
                        {
                            review.id === this.state.reviewIdBeingEdited ?
                            <div>
                                <Row className="edit-review-buttons">
                                        <p>Overall {this.state.toolNameInputValue} rating:
                                            <span className={`bold ${this.applyColor(this.state.editRangeValue) }`}>{this.state.editRangeValue}% </span></p>
                                        <p className="range-field maxWidth70 center">
                                            <input
                                            type="range"
                                            value={this.state.editRangeValue}
                                            onChange={evt => this.updateInputValue(evt, 'editRangeValue')}
                                            min="0" max="100" />
                                        </p>
                                </Row>
                                <Row className="edit-review-buttons">
                                    <Button disabled={!this.state.editFileTypePasses}
                                    onClick={() => this.toggleEditSaveHandler(review.id === this.state.reviewIdBeingEdited, review.tool_name,
                                                                            review.id, review.text, review.path,
                                                                            review.sharable, review.rating, review.answer_1,
                                                                            review.answer_2, review.answer_3, review.answer_4, review.answer_5, review.int_type)}
                                    className="portal-buttons"
                                    waves='light'>
                                        Save
                                        <Icon right tiny className="data">check</Icon>
                                    </Button>
                                </Row>
                                <Row className="edit-review-buttons">
                                    {
                                        this.props.files && this.props.files.filter(file => file.review_id == review.id).length  > 0 && review.id === this.state.reviewIdBeingEdited && review.path ?
                                            <Modal
                                            className="review-modal"
                                            trigger={
                                            <div className="portal-buttons view-buttons" >
                                                <span onClick={() => this.openAttachment(this.props.files.filter(file => file.review_id == review.id)[0].file, `${review.id}-canvas`, review.path.substr(review.path.length - 3) == 'pdf')}
                                                className="open-attachment-span" >
                                                    View
                                                    <Icon right tiny className="data view-icon">folder_open</Icon>
                                                </span>
                                            </div>
                                            }>
                                            {
                                                review.path.substr(review.path.length - 3) == 'pdf' ?
                                                <div id={`${review.id}-canvas-container`}></div> :
                                                review.path.substr(review.path.length - 3) == 'jpg' || review.path.substr(review.path.length - 3) == 'png' || review.path.substr(review.path.length - 3) == 'jpeg' ?
                                                <img alt="pdf-file" className="canvas" src={`data:image/${review.path.substr(review.path.length - 3)};base64,${this.props.files.filter(file => file.review_id == review.id)[0].file}`} /> :
                                                null
                                            }
                                            </Modal>
                                    :
                                        null
                                    }
                                </Row>
                                {
                                    review.id === this.state.reviewIdBeingEdited && review.path ?
                                    <Row className="edit-review-buttons">
                                        <Button onClick={() => this.removeFileHandler(review.id)} className="portal-buttons delete-button" waves='light'> Remove Current File <Icon right tiny className="data">delete_outline</Icon></Button>
                                    </Row>
                                    :
                                    null
                                }
                                <Row className="edit-review-buttons">
                                    <Button onClick={() => this.deleteHandler(review.id)} className="portal-buttons delete-button" waves='light'> Delete Review <Icon right tiny className="data">delete_outline</Icon></Button>
                                </Row>
                            </div>
                            :
                            <div>
                                <Row className="border-bottom"></Row>
                                <br />
                                <Row className="valign-wrapper maxWidth70 edit-review-buttons">
                                    <Col className="border-bottom standard-height" s={6}>
                                            <div className={`bold ${this.applyColor(review.rating) }`}>{review.rating}% </div>
                                    </Col>
                                    <Col className="border-bottom standard-height" s={6}>

                                        {
                                            review.sharable ?
                                            <Row>
                                                <Col s={4}>
                                                    Public
                                                </Col>
                                                <Col s={4}></Col>
                                                <Col s={4}>
                                                    <Icon >public</Icon>
                                                </Col>
                                            </Row>
                                            :
                                            <Row>
                                                <Col s={4}>
                                                    Private
                                                </Col>
                                                <Col s={4}></Col>
                                                <Col s={4}>
                                                    <Icon >security</Icon>
                                                </Col>
                                            </Row>
                                        }
                                    </Col>
                                </Row>
                                <Row className="edit-review-buttons">
                                    <Button onClick={() => this.toggleEditSaveHandler(review.id === this.state.reviewIdBeingEdited, review.tool_name,
                                                                                    review.id, review.text,  review.path,
                                                                                    review.sharable, review.rating, review.answer_1,
                                                                                    review.answer_2, review.answer_3, review.answer_4, review.answer_5, review.int_type)}
                                            className="portal-buttons"
                                            waves='light'>
                                            Edit
                                            <Icon right tiny className="data">create</Icon>
                                    </Button>
                                </Row>
                                <Row className="edit-review-buttons">
                                    {
                                        (this.props.files.length != this.props.allReviews.filter(review => review.path).length) && review.path ?
                                        <div>
                                            <div className="progress">
                                                <div className="indeterminate"></div>
                                            </div>
                                            <div>Loading File...</div>
                                        </div>
                                        :
                                        this.props.files && this.props.files.filter(file => file.review_id == review.id).length  > 0  && (review.id !== this.state.reviewIdBeingEdited) && review.path ?
                                            <Modal
                                            className="review-modal"
                                            trigger={
                                            <div className="portal-buttons view-buttons" >
                                                <span onClick={() => this.openAttachment(this.props.files.filter(file => file.review_id == review.id)[0].file, `${review.id}-canvas`, review.path.substr(review.path.length - 3) == 'pdf')}
                                                className="open-attachment-span" >
                                                    View
                                                    <Icon right tiny className="data view-icon">folder_open</Icon>
                                                </span>
                                            </div>
                                            }>
                                            {
                                                review.path.substr(review.path.length - 3) == 'pdf' ?
                                                <div id={`${review.id}-canvas-container`}></div> :
                                                review.path.substr(review.path.length - 3) == 'jpg' || review.path.substr(review.path.length - 3) == 'png' ?
                                                <img alt="pdf-file" className="canvas" src={`data:image/${review.path.substr(review.path.length - 3)};base64,${this.props.files.filter(file => file.review_id == review.id)[0].file}`} /> :
                                                null
                                            }
                                            </Modal>
                                    :
                                        null
                                    }
                                </Row>
                            </div>
                        }
                    </Col>
                  </Row>
                </Section>
              )
            })
            :
                null
            }

            {/* //////////////////// ////////////////////   //////////////////// //////////////////// ////////////////////  ///////////////////////// */}
            {/* //////////////////// ////////////////////   //////////////////// //////////////////// ////////////////////  ///////////////////////// */}
            {/* //////////////////// ////////////////////              ADD A REVIEW SECTION             ///////////////////////// */}
            {/* //////////////////// ////////////////////  //////////////////// //////////////////// ////////////////////  ///////////////////////// */}
            {/* //////////////////// ////////////////////   //////////////////// //////////////////// ////////////////////  ///////////////////////// */}
            <Section className="reviews-wrapper center">
                <Collapsible id="add-review-collapsible" popout defaultActiveKey={1}>
                <CollapsibleItem header='Write A Review' icon='add'>
                    <Section>
                        <Row className="valign-wrapper max-width-50">
                            <Col s={6}>
                            <Input
                            className="center-align"
                            s={12}
                            onChange={evt => this.updateInputValue(evt, 'toolNameInputValue')}
                            value={this.state.toolNameInputValue}
                            type='select' label="Tool" >
                              <option value='MEADE/SORT-OE'>MEADE/SORT-OE</option>
                              <option value='Argument Mapper'>Argument Mapper</option>
                              <option value='Attack the Network'>Attack the Network</option>
                              <option value='SOF4D'>SOF4D</option>
                            </Input>
                            </Col>
                            <Col s={6}>
                            <Input
                            className="center-align"
                            s={12}
                            onChange={evt => this.updateInputValue(evt, 'intType')}
                            value={this.state.intType}
                            type='select' label="Your Background" >
                                <option value='NOT SPECIFIED'>NOT SPECIFIED</option>
                                <option value='HUMINT'>HUMINT</option>
                                <option value='SIGINT'>SIGNINT</option>
                                <option value='GEOINT'>GEOINT</option>
                                <option value='MASINT'>MASINT</option>
                                <option value='OSINT'>OSINT</option>
                                <option value='CYBINT/DNINT'>CYBINT/DNINT</option>
                                <option value='FININT'>FININT</option>
                                <option value='TECHINT'>TECHINT</option>
                                <option value='OTHER'>OTHER</option>
                            </Input>
                            </Col>
                        </Row>
                        <Row>
                            <OFF />
                        </Row>
                        <Row>
                            <Collapsible popout default defaultActiveKey={2}>
                                <CollapsibleItem header="Additional Comments / File Upload" icon="add">
                                <Row className="valign-wrapper">
                                            <Col s={8}>
                                                <Input
                                                s={12}
                                                className="text-align-center"
                                                type='textarea'
                                                value={this.state.textInputValue}
                                                onChange={evt => this.updateInputValue(evt, 'textInputValue')}
                                                placeholder="Comment here..." />
                                            </Col>
                                            {
                                                !this.state.fileInputValue ?
                                                <Col s={4}>
                                                    <Row>
                                                        <Col s={2}></Col>
                                                        <Col s={10}>
                                                            <Input
                                                            type="file"
                                                            label={<span>Upload<Icon right tiny  className="data">cloud_upload</Icon></span>}
                                                            name="fileUpload"
                                                            placeholder="(.jpg/.png/.jpeg) or a .pdf"
                                                            onChange={evt => this.updateInputValue(evt, 'fileInputValue')} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                :
                                                <Col s={4}>
                                                            {
                                                                this.state.fileInputValue && this.state.fileTypePasses ?
                                                                    this.state.fileInputValue.type.substring(0, 5) !== 'image' ?
                                                                    <Row>
                                                                        <Row className="valign-wrapper">
                                                                                <Col s={8} className="non-image-file file" >
                                                                                    {this.state.fileInputValue.name}
                                                                                    {this.state.fileInputValue.type}
                                                                                </Col>
                                                                                <Col s={2}></Col>
                                                                                <Col s={2}>
                                                                                    <Icon small className="data icon-green">check_circle_outline</Icon>
                                                                                </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Button onClick={() => this.setState({ ...this.state, fileInputValue: null })} className="portal-buttons delete-button min-width-100" waves='light'> Remove Staged Upload <Icon right tiny className="data">delete_outline</Icon></Button>
                                                                        </Row>
                                                                    </Row>
                                                                    :
                                                                    <Row>
                                                                        <Row className="valign-wrapper">
                                                                                <Col s={8}>
                                                                                <img alt="uploaded-file" className="file"  src={window.URL.createObjectURL(this.state.fileInputValue)} />
                                                                                </Col>
                                                                                <Col s={1}></Col>
                                                                                <Col s={3}>
                                                                                    <Icon small className="data icon-green">check_circle_outline</Icon>
                                                                                </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Button onClick={() => this.setState({ ...this.state, fileInputValue: null })} className="portal-buttons delete-button min-width-100" waves='light'> Remove Staged Upload <Icon right tiny className="data">delete_outline</Icon></Button>
                                                                        </Row>
                                                                    </Row>
                                                                :
                                                                null
                                                            }
                                                </Col>
                                            }
                                </Row>
                                {
                                    !this.state.fileTypePasses ?
                                    <Row>
                                        <div className="error-text">File must be a picture(.jpg/.png/.jpeg) or a .pdf.</div>
                                        <div className="error-text">Please ensure file extensions are all lowercase.</div>
                                    </Row>
                                    :
                                    null
                                }
                                </CollapsibleItem>
                            </Collapsible>
                        </Row>
                        <Row className="valign-wrapper">
                            <Col s={6} className="center">
                                <Row className="border-bottom">
                                <p>Overall {this.state.toolNameInputValue} rating:
                                    <span className={`bold ${this.applyColor(this.state.rangeValue) }`}>{this.state.rangeValue}% </span></p>
                                <p className="range-field">
                                    <input
                                    type="range"
                                    value={this.state.rangeValue}
                                    onChange={evt => this.updateInputValue(evt, 'rangeValue')}
                                     min="0" max="100" />
                                </p>
                                </Row>
                            </Col>
                            <Col s={6}>
                                <Row>
                                    {
                                        this.props.allQuestionsAreIndifferent  ?
                                            <Modal
                                            id="submit-modal"
                                            header='Confirmation'
                                            trigger={
                                                <Button
                                                    disabled={ !this.state.fileTypePasses }
                                                    className="portal-buttons" waves='light'>
                                                    <Icon right className="data">send</Icon>
                                                    Submit Review
                                                </Button>
                                            }>
                                            <Row className="valign-wrapper">
                                                <Col s={8}>
                                                    <p>You have left all of the fields marked as <span className="bold">"Indifferent"</span> and have given {this.state.toolNameInputValue} an overall rating of<span className={`bold ${this.applyColor(this.state.rangeValue) }`}>{this.state.rangeValue}% </span>. Would you still like to submit your review?</p>
                                                </Col>
                                                <Col s={4}>
                                                <Button
                                                    disabled={ !this.state.fileTypePasses }
                                                    onClick={() => this.postReviewHandler()} className="portal-buttons modal-close" waves='light'>
                                                    <Icon right className="data">send</Icon>
                                                    Submit Review
                                                </Button>
                                                </Col>
                                            </Row>
                                            </Modal>
                                        :
                                            <div>
                                                <Button
                                                    disabled={ !this.state.fileTypePasses }
                                                    onClick={() => this.postReviewHandler()} className="portal-buttons" waves='light'>
                                                    <Icon right className="data">send</Icon>
                                                    Submit Review
                                                </Button>
                                                {
                                                    !this.props.postComplete && this.state.postStarted ?
                                                    <div className="progress">
                                                        <div className="indeterminate"></div>
                                                    </div>
                                                    :
                                                    null
                                                }
                                            </div>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Section>
                </CollapsibleItem>
                </Collapsible>
            </Section>
        </div>
      )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
      jobTitle: state.auth.jobTitle,
      company: state.auth.company,
      allReviews: state.reviews.allReviews,
      files: state.reviews.files,
      postComplete: state.reviews.postComplete,
      updateComplete: state.reviews.updateComplete,
      deleteComplete: state.reviews.deleteComplete,
      removeFileComplete: state.reviews.removeFileComplete,
      reviewsRequestFinished: state.reviews.reviewsRequestFinished,
      allQuestionsAreIndifferent: state.reviews.allQuestionsAreIndifferent,
      sortoeAnswerInputs: state.reviews.sortoeAnswerInputs,
      OFFquestions: state.reviews.OFFquestions,
      role: state.auth.role,
      lastReviewID: state.reviews.lastReviewID,
      answers: state.reviews.answers
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    authenticate,
    getAllReviews,
    postReview,
    updateReview,
    deleteReview,
    getFile,
    clearFiles,
    setPostCompleteFalse,
    setUpdateCompleteFalse,
    setDeleteCompleteFalse,
    setRemoveFileCompleteFalse,
    getUserInfo,
    setPermissions,
    postAnswers,
    removeFile}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
