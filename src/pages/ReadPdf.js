import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from 'react-pdf-js';
import { useLocation } from 'react-router-dom';
import pdf from '../DA1_BaoCaoLan3_30-10_XayDungUngDungLuyenTOEIC.pdf'
import { Document, Page, pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`

const ReadPdf = () => { 
    // const [page, setPage] = useState(1);
    // const [pages, setPages] = useState(null);
     const location = useLocation();
     const data = location.state.filePdf;
     const [numPages, setNumPages] = useState();
     const [pageNumber, setPageNumber] = useState(1);
   
     function onDocumentLoadSuccess({ numPages }){
       setNumPages(numPages);
     }
     useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/scripts/pdf.worker.js`;
    }, []);
    // const renderPagination = (page, pages) => {
    //   if (!pages) {
    //     return null;
    //   }
    //   let previousButton = <li className="previous" onClick={() => setPage(page - 1)}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    //   if (page === 1) {
    //     previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    //   }
    //   let nextButton = <li className="next" onClick={() => setPage(page + 1)}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    //   if (page === pages) {
    //     nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    //   }
    //   return (
    //     <nav>
    //       <ul className="pager">
    //         {previousButton}
    //         {nextButton}
    //       </ul>
    //     </nav>
    //   );
    // }
   
    // const canvasEl = useRef(null);
   
    // const [loading, numPages] = usePdf({
    //   file: 'https://storage.googleapis.com/toeicpracticeapp-9dc19.appspot.com/PDF/uploads%5C3c753f4ea91ca05fd7eacc630e67f51f.pdf?GoogleAccessId=firebase-adminsdk-eqpy0%40toeicpracticeapp-9dc19.iam.gserviceaccount.com&Expires=32508752400&Signature=NGHzYaxBITv%2FtCiMR%2F5HE39pbcL4kpHyZ%2FLq0oQm0%2BUtURmnBO0J3OVFbulJ6Kxc07Ify2dUHcyhp%2Bfid9eRrjInIa2LxbS9jIldu%2BVY8SHwjLGB1ncrK7%2BW%2FDB6D60JEcGlpES19iGHPCpmyqgUPRRUtnJyKn3gRyszJSFUVLt07%2BWpPs9p9HXvTk3LkZWyQJnUcPmSTzZR%2Fc0Uj2PTtwaiOQ4Ezw6VcFDfezcMQ8AsB2gRwUrbgifAJVNwBPAYnaqk%2BLgslDLlBVPYd5C6W8pUDmuEbaWtiTTIOvDu3KXycMa16qYaSfys2tkUWT5p7BTmHvSXgfcwHEiYWeP4Xg%3D%3D',
    //   page,
    //   canvasEl
    // });
   
    // useEffect(() => {
    //   setPages(numPages);
    // }, [numPages]);

   
     return (
       <div>
         {/* {loading && <span>Loading...</span>}
        <canvas ref={canvasEl} /> */}
         {/* {renderPagination(page, pages)} */}
         <div>
      <Document onLoadError={console.error} file={'https://www.africau.edu/images/default/sample.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>

       </div>
     );
}
export default ReadPdf;