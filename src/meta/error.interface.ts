export default interface IError {
  id?: any; // JSON:API spec just says "a unique identifier"
  links?: {
    about?: string;
  };
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: object;
  meta?: object;
};
