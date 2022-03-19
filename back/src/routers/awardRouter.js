import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";

const awardRouter = Router();
awardRouter.use(login_required);

// 수상경력 생성
awardRouter.post("/award/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error("Content-Type을 application/json으로 설정해주세요.");
        }

        const { user_id, title, description } = req.body;
        const newAward = await AwardService.createAward({ user_id, title, description });
        res.status(201).json(newAward);

    } catch (err) {
        next(err);
    }
})

// 수상경력 조회(id)
awardRouter.get("/awards/:id", async (req, res, next) => {
    try {
        const award_id = req.params.id;
        const award = await AwardService.getAwardById({ award_id });

        if (award.errorMessage) {
            throw new Error(award.errorMessage);
        }

        res.status(200).json(award);
    } catch (err) {
        next(err);
    }
})

// 수상경력 수정
awardRouter.put("/awards/:id", async (req, res, next) => {
    try {
        const award_id = req.params.id;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const updateValue = { title, description };
        const updatedAward = await AwardService.updateAward({ award_id, updateValue });

        if (updatedAward.errorMessage) {
            throw new Error(updatedAward.errorMessage);
        }
        
        res.status(200).json(updatedAward);
    } catch (err) {
        next(err);
    }
})

// 특정 유저의 수상경력 리스트 조회
awardRouter.get("/awardlist/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const awardList = await AwardService.getAwardListByUserId({ user_id });
        
        res.status(200).json(awardList);
    } catch (err) {
        next(err);
    }
})

export { awardRouter };