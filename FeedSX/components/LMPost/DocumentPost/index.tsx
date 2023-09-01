import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import STYLES from '../../../constants/Styles';
import {PostUI} from '../../../Models/PostModel';
import { DOCUMENT_ATTACHMENT_TYPE } from '../../../constants/Strings';

const DocumentPost = ({postDetail}: PostUI) => {
  const { attachments} = {...postDetail}

  // filtering out the attachments which contains documents
  const documentData = attachments?.filter(
    item => item.attachmentType === DOCUMENT_ATTACHMENT_TYPE,
  );

  return (
    <View>
      {documentData.map((item, index) => (
         // document View
         <View key={index} style={styles.postMedia}>
         <View style={styles.docView}>
           <Image
             source={require('../../../assets/images/pdf_icon3x.png')}
             resizeMode={'contain'}
             style={styles.pdfIcon}
           />
           {/* document detail view */}
           <View style={{marginLeft: STYLES.$MARGINS.SMALL}}>
             <Text style={[styles.docTitle]}>Event Document</Text>
             <View style={styles.alignRow}>
               <Text style={[styles.docDetail]}>2 Pages</Text>
               <Image
                 source={require('../../../assets/images/single_dot3x.png')}
                 resizeMode={'contain'}
                 style={styles.dotImageSize}
               />
               <Text style={[styles.docDetail]}>278 Kb</Text>
               <Image
                 source={require('../../../assets/images/single_dot3x.png')}
                 resizeMode={'contain'}
                 style={styles.dotImageSize}
               />
               <Text style={[styles.docDetail]}>PDF</Text>
             </View>
           </View>
         </View>
       </View>
      ))}
    </View>
  );
};

export default DocumentPost;
