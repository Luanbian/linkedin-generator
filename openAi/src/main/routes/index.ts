import { Router } from "express";
import handler from "../../gateway";

export default (router: Router):void => {
  router.get('/api/test', handler)
}