import type { Schema, Struct } from '@strapi/strapi';

export interface GiveOtherMethod extends Struct.ComponentSchema {
  collectionName: 'components_give_other_methods';
  info: {
    description: 'Alternative giving method with description';
    displayName: 'Other Giving Method';
    icon: 'gift';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface GivePaymentMethod extends Struct.ComponentSchema {
  collectionName: 'components_give_payment_methods';
  info: {
    description: 'Primary giving method with fee info';
    displayName: 'Payment Method';
    icon: 'creditCard';
  };
  attributes: {
    fee: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    recommended: Schema.Attribute.Boolean;
    url: Schema.Attribute.String;
  };
}

export interface MinistryCongregationDetail extends Struct.ComponentSchema {
  collectionName: 'components_ministry_congregation_details';
  info: {
    description: 'Ministry info specific to a location';
    displayName: 'Congregation Detail';
    icon: 'mapPin';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    director: Schema.Attribute.Relation<
      'oneToOne',
      'api::team-member.team-member'
    >;
    location: Schema.Attribute.Relation<'oneToOne', 'api::location.location'>;
  };
}

export interface MinistryFeatureBlock extends Struct.ComponentSchema {
  collectionName: 'components_ministry_feature_blocks';
  info: {
    description: 'Ministry feature block with heading, body, and icon';
    displayName: 'Feature Block';
    icon: 'layout';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    icon: Schema.Attribute.String;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    description: 'Frequently asked question with answer';
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    question: Schema.Attribute.String;
  };
}

export interface SharedServiceTime extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_times';
  info: {
    description: 'Service day and times';
    displayName: 'Service Time';
    icon: 'clock';
  };
  attributes: {
    label: Schema.Attribute.String;
    times: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'give.other-method': GiveOtherMethod;
      'give.payment-method': GivePaymentMethod;
      'ministry.congregation-detail': MinistryCongregationDetail;
      'ministry.feature-block': MinistryFeatureBlock;
      'shared.faq': SharedFaq;
      'shared.service-time': SharedServiceTime;
    }
  }
}
