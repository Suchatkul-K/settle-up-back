import * as billService from "../services/bill-service.js";
import * as participantService from "../services/participant-service.js";

// const a = {
//   id: 1, // billId
//   circleId: 6,
//   title: "aaa",
//   amount: 1234,
//   billDate: "2024-02-21T00:00:00.000Z",
//   createdAt: "2024-02-21T08:57:19.000Z",
//   updatedAt: "2024-02-21T08:57:19.000Z",
//   isActive: true,
// };

// const requestBody = {
//   debtor: [
//     { id: 4, name: "This is a bot", amount: 1200, splitMethod: "FIXED" },
//     { id: 5, name: "This is a bot 2", amount: 1, splitMethod: "SHARE" },
//     { id: 6, name: "This is a bot 3", amount: 1, splitMethod: "SHARE" },
//   ],
// };

// const c = [
//   {
//     billId: 1,
//     memberId: 4,
//     fixedValue: 1200,
//     percentValue: 0,
//     splitMethod: "FIXED",
//     role: "DEBTOR",
//   },
//   {
//     billId: 1,
//     memberId: 5,
//     fixedValue: 0,
//     percentValue: 17,
//     splitMethod: "SHARE",
//     role: "DEBTOR",
//   },
//   {
//     billId: 1,
//     memberId: 6,
//     fixedValue: 0,
//     percentValue: 17,
//     splitMethod: "SHARE",
//     role: "DEBTOR",
//   },
// ];

// const d = [{ id: 2, name: "aa", amount: 1234 }];

export async function createBill(req, res, next) {
  try {
    const { title, amount, billDate, valuePerShare, summary, sharedDebtor } =
      req.body;
    // console.log(req.user);
    // console.log(req.circle);
    // console.log(req.body);
    // console.log(
    //   req.body.debtor.map((el) => {
    //     let { id, amount, splitMethod } = el;
    //     let temp = {
    //       billId: 1,
    //       memberId: id,
    //       role: "DEBTOR",
    //     };
    //     if (splitMethod == "FIXED") {
    //       return {
    //         ...temp,
    //         fixedValue: amount,
    //         percentValue: 0,
    //         splitMethod: "FIXED",
    //       };
    //     } else if (splitMethod == "SHARE") {
    //       return {
    //         ...temp,
    //         fixedValue: 0,
    //         percentValue: amount * valuePerShare,
    //         splitMethod: "SHARE",
    //       };
    //     }
    //   })
    // );

    // create bill
    const billData = {
      circleId: req.circle.id,
      title,
      amount,
      billDate: new Date(billDate),
    };
    console.log(billData);

    const newBill = await billService.createBill(billData);
    console.log(newBill);

    // add creditor
    const addCreditor = await participantService.addBillParticipants(
      req.body.creditor.map((el) => {
        let { id, amount } = el;

        return {
          billId: newBill.id,
          memberId: id,
          fixedValue: amount,
          percentValue: 0,
          splitMethod: "FIXED",
          role: "CREDITOR",
        };
      })
    );
    console.log(addCreditor);

    // add debtor
    const addDebtor = await participantService.addBillParticipants(
      req.body.debtor.map((el) => {
        let { id, amount, splitMethod } = el;
        let temp = {
          billId: newBill.id,
          memberId: id,
          role: "DEBTOR",
        };
        if (splitMethod == "FIXED") {
          return {
            ...temp,
            fixedValue: amount,
            percentValue: 0,
            splitMethod: "FIXED",
          };
        } else if (splitMethod == "SHARE") {
          return {
            ...temp,
            fixedValue: 0,
            percentValue: amount * valuePerShare,
            splitMethod: "SHARE",
          };
        }
      })
    );
    console.log(addDebtor);

    res.status(201).json({ message: "create new bill" });
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function getAllBill(req, res, next) {
  try {
    const bills = await billService.getAllBillByCycleId(req.circle.id);
    console.log(bills);
    res.status(200).json({ message: "Get all bills", bills });
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function updateBill(req, res, next) {
  try {
    const {
      title,
      amount,
      billDate,
      valuePerShare,
      summary,
      sharedDebtor,
      creditor,
      debtor,
    } = req.body;

    const { billId } = req.params;

    // console.log(req.body);

    // update bill
    const billData = {
      circleId: req.circle.id,
      title,
      amount,
      billDate: new Date(billDate),
    };
    // console.log(billData);

    const newBill = await billService.updateBillByBillId(+billId, billData);
    // console.log(newBill);

    const participants = await participantService.getAllParticipantByBillId(
      +billId
    );
    // console.log(participants);

    const existCreditor = participants
      .filter((el) => el.role == "CREDITOR")
      .map((el) => el.id);
    const existDebtor = participants
      .filter((el) => el.role == "DEBTOR")
      .map((el) => el.id);

    // add new creditor
    const addCreditor = await participantService.addBillParticipants(
      creditor
        .filter((el) => !existCreditor.includes(el.id))
        .map((el) => {
          let { id, amount } = el;

          return {
            billId: newBill.id,
            memberId: id,
            fixedValue: amount,
            percentValue: 0,
            splitMethod: "FIXED",
            role: "CREDITOR",
          };
        })
    );
    // console.log(addCreditor);

    // add new debtor
    const addDebtor = await participantService.addBillParticipants(
      debtor
        .filter((el) => !existDebtor.includes(el.id))
        .map((el) => {
          let { id, amount, splitMethod } = el;
          let temp = {
            billId: newBill.id,
            memberId: id,
            role: "DEBTOR",
          };
          if (splitMethod == "FIXED") {
            return {
              ...temp,
              fixedValue: amount,
              percentValue: 0,
              splitMethod: "FIXED",
            };
          } else if (splitMethod == "SHARE") {
            return {
              ...temp,
              fixedValue: 0,
              percentValue: amount * valuePerShare,
              splitMethod: "SHARE",
            };
          }
        })
    );
    // console.log(addDebtor);

    // update
    creditor
      .filter((el) => existCreditor.includes(el.id))
      .map((el) => {
        let { id, amount } = el;
        let data = {
          fixedValue: amount,
        };

        participantService.updateBillParticipantsByParticipantId(id, data);
      });
    debtor
      .filter((el) => existDebtor.includes(el.id))
      .map((el) => {
        let { id, amount, splitMethod } = el;

        if (splitMethod == "FIXED") {
          let data = {
            fixedValue: amount,
            percentValue: 0,
            splitMethod: "FIXED",
          };
          participantService.updateBillParticipantsByParticipantId(id, data);
        } else if (splitMethod == "SHARE") {
          let data = {
            fixedValue: 0,
            percentValue: amount * valuePerShare,
            splitMethod: "SHARE",
          };
          participantService.updateBillParticipantsByParticipantId(id, data);
        }
      });

    //delete old participant
    const deletedCreditor = existCreditor.filter(
      (el) => !creditor.map((cre) => cre.id).includes(el)
    );
    const deletedDebtor = existDebtor.filter(
      (el) => !debtor.map((cre) => cre.id).includes(el)
    );
    const deletePart = await participantService.deleteManyParticipantById([
      ...deletedCreditor,
      ...deletedDebtor,
    ]);

    res.status(201).json({ message: "create new bill" });
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function deleteBill(req, res, next) {
  try {
    const {billId} = req.params
    const participants = await participantService.getAllParticipantByBillId((+billId))

    if(participants) {
      let participantIds = participants.map(el => el.id)
      await participantService.deleteManyParticipantById(participantIds)
    }

    const deletedBill = await billService.deleteBillByBillId((+billId))

    res.status(200).json({ message: "Delete bill", deletedBill})
  } catch (error) {
    console.log(error);
    next();
  }
}
