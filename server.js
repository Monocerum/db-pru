import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5020;

//Middleware to parse request bodies
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//MYSQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'koshi28',
    database: 'pru-db'
});

db.connect((err) => {
    if(err){
        console.log('Error connecting to database: ', err)
        throw err;
    }

    console.log('Connected to the database');
});


//Route after registration
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;

    // Validate input
    if (!email || !username || !password) {
        return res.status(400).send('Please fill in all fields.');
    }

    // Insert into database
    const sql = 'INSERT INTO LOGIN (EmailAddress, Username, Password) VALUES (?, ?, ?)';
    db.query(sql, [email, username, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            console.log(email, username, password);
            return res.status(500).send('Registration failed.');
        }
        // Query to get the last inserted UserID
        const getUserIdSql = 'SELECT LAST_INSERT_ID() AS UserID';
        db.query(getUserIdSql, (err, results) => {
            if (err) {
                console.error('Error fetching UserID:', err);
                return res.status(500).send('Registration failed.');
            }

            const userId = results[0].UserID;

            res.status(200).json({ userId });
        });
    });
});

// Route for application
app.post('/apply', (req, res) => {
    const {
        fullname, salutation, alias, age, bday, bplace, civil_status,
        nationality, height, weight, sex, ps_address, ps_country,
        ps_zip, pm_address, pm_country, pm_zip, occupation, position,
        work_nature, sof, gai, nw, hired, regular, income, sss, tin,
        otherid, otheridnum, otherid2, otherid2number, mobile, tel, email, 
        employerName, employerWorkNature, employerTel, employerAdrs,
        employerCountry, employerZip, 
        beneficiary1Name, beneficiary1Bday, beneficiary1Sex, beneficiary1Relationship,
        beneficiary1Share, beneficiary1Type, beneficiary1Designation,
        beneficiary1Bplace, beneficiary1Nationality, beneficiary1PsAddress,
        beneficiary1PsCountry, beneficiary1PsZip, beneficiary1Mobile,
        beneficiary1Tel, beneficiary1Email, 
        beneficiary2Name, beneficiary2Bday, beneficiary2Sex, beneficiary2Relationship,
        beneficiary2Share, beneficiary2Type, beneficiary2Designation,
        beneficiary2Bplace, beneficiary2Nationality, beneficiary2PsAddress,
        beneficiary2PsCountry, beneficiary2PsZip, beneficiary2Mobile,
        beneficiary2Tel, beneficiary2Email
    } = req.body;

    // Validate applicant input
    const requiredApplicant = [
        'fullname', 'age', 'bday', 'bplace', 'civil_status', 'nationality',
        'height', 'weight', 'sex', 'ps_address', 'ps_country', 'ps_zip',
        'pm_address', 'pm_country', 'pm_zip', 'occupation', 'position',
        'work_nature', 'sof', 'gai', 'nw', 'hired', 'regular', 'income', 'sss', 'tin',
        'mobile', 'email'
    ];

    const missingApplicant = requiredApplicant.filter(field => !req.body[field]);
    if (missingApplicant.length > 0) {
        return res.status(400).json({ error: `Missing applicant fields: ${missingApplicant.join(', ')}` });
    }

    // Validate employer input
    const requiredEmployer = [
        'employerName', 'employerWorkNature', 'employerTel', 'employerAdrs',
        'employerCountry', 'employerZip'
    ];

    const missingEmployer = requiredEmployer.filter(field => !req.body[field]);
    if (missingEmployer.length > 0) {
        return res.status(400).json({ error: `Missing employer fields: ${missingEmployer.join(', ')}` });
    }

    // Validate beneficiary1 input
    const requiredBen1 = [
        'beneficiary1Name', 'beneficiary1Bday', 'beneficiary1Relationship',
        'beneficiary1Share', 'beneficiary1Type', 'beneficiary1Designation',
        'beneficiary1Bplace', 'beneficiary1Nationality', 'beneficiary1PsAddress', 
        'beneficiary1PsCountry', 'beneficiary1PsZip','beneficiary1Mobile', 
        'beneficiary1Tel', 'beneficiary1Email'
    ];

    const missingBen1 = requiredBen1.filter(field => !req.body[field]);
    if (missingBen1.length > 0) {
        return res.status(400).json({ error: `Missing primary beneficiary fields: ${missingBen1.join(', ')}` });
    }

    // Validate beneficiary2 input if provided
    let beneficiary2Fields = [];
    let tempSql = `INSERT INTO TEMP (
        ApplicantName, Salutation, Alias, Age, Birthdate, Birthplace, CivilStatus,
        Nationality, Height, Weight, Sex, PresentAddress, PrsntAdrsCountry, PrsntAdrsZIP,
        PermanentAddress, PermntAdrsCountry, PermntAdrsZIP, Occupation, Position, ApplicantWorkNature,
        SourceOfFunds, GrossAnnualIncome, NetWorth, DateHired, DateOfRegularization, MonthlyIncome,
        SSSID, TINID, OtherID, OtherIDNumber, OtherID2, otherid2number, MobileNumber, TelNo, EmailAddress,
        EmpOrBusName, EmpOrBusNature, EmpOrBusTelNo, EmpOrBusAdrs, EmpOrBusCountry, EmpOrBusZIP,
        Beneficiary1Name, Beneficiary1DOB, Beneficiary1Sex, Beneficiary1Relationship, Beneficiary1PrcntShare,
        Beneficiary1Type, Beneficiary1Designation, Beneficiary1POB, Beneficiary1Nationality, Beneficiary1PrsntAdrs,
        Beneficiary1Country, Beneficiary1ZIP, Beneficiary1MobileNm, Beneficiary1TelNo, Beneficiary1EmailAdrs`;

    const sqlValues = [
        fullname, salutation, alias, age, bday, bplace, civil_status,
        nationality, height, weight, sex, ps_address, ps_country,
        ps_zip, pm_address, pm_country, pm_zip, occupation, position,
        work_nature, sof, gai, nw, hired, regular, income, sss, tin,
        otherid, otheridnum, otherid2, otherid2number, mobile, tel, email, employerName, employerWorkNature,
        employerTel, employerAdrs, employerCountry, employerZip,
        beneficiary1Name, beneficiary1Bday, beneficiary1Sex, beneficiary1Relationship,
        beneficiary1Share, beneficiary1Type, beneficiary1Designation, beneficiary1Bplace,
        beneficiary1Nationality, beneficiary1PsAddress, beneficiary1PsCountry,
        beneficiary1PsZip, beneficiary1Mobile, beneficiary1Tel, beneficiary1Email
    ];

    if (beneficiary2Name) {
        const requiredBen2 = [
            'beneficiary2Name', 'beneficiary2Bday', 'beneficiary2Relationship',
            'beneficiary2Share', 'beneficiary2Type', 'beneficiary2Designation',
            'beneficiary2PsAddress', 'beneficiary2PsCountry', 'beneficiary2PsZip',
            'beneficiary2Mobile', 'beneficiary2Tel', 'beneficiary2Email'
        ];

        const missingBen2 = requiredBen2.filter(field => !req.body[field]);
        if (missingBen2.length > 0) {
            return res.status(400).json({ error: `Missing secondary beneficiary fields: ${missingBen2.join(', ')}` });
        }

        beneficiary2Fields = [
            beneficiary2Name, beneficiary2Bday, beneficiary2Sex, beneficiary2Relationship,
            beneficiary2Share, beneficiary2Type, beneficiary2Designation,
            beneficiary2Bplace, beneficiary2Nationality, beneficiary2PsAddress,
            beneficiary2PsCountry, beneficiary2PsZip, beneficiary2Mobile,
            beneficiary2Tel, beneficiary2Email
        ];

        tempSql += `, Beneficiary2Name, Beneficiary2DOB, Beneficiary2Sex, Beneficiary2Relationship, Beneficiary2PrcntShare,
        Beneficiary2Type, Beneficiary2Designation, Beneficiary2POB, Beneficiary2Nationality, Beneficiary2PrsntAdrs,
        Beneficiary2Country, Beneficiary2ZIP, Beneficiary2MobileNm, Beneficiary2TelNo, Beneficiary2EmailAdrs
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    } else {
        tempSql += `) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    }

    db.query(tempSql, [...sqlValues, ...beneficiary2Fields], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error, please try again later.' });
        }

        const tempId = result.insertId;

        // Process and move data to main applicant, employer, and beneficiary tables
        processTempData(tempId, req.body, res);
    });
});

function processTempData(tempId, tempData, res) {
    const employerCheckSql = `SELECT EmployerCode FROM EMPLOYER WHERE EmpOrBusName = ?`;

    db.query(employerCheckSql, [tempData.employerName], (err, employerRows) => {
        if (err) {
            console.error('Error checking employer data:', err);
            return res.status(500).json({ error: 'Database error checking employer data.' });
        }

        let employerCode = null;

        if (employerRows.length > 0) {
            // Employer exists, use existing EmployerCode
            employerCode = employerRows[0].EmployerCode;
            insertApplicant(employerCode, tempData, res);
        } else {
            // Employer does not exist, insert new employer and use its generated EmployerCode
            const employerInsertSql = `INSERT INTO EMPLOYER (
                EmpOrBusName, EmpOrBusNature, EmpOrBusTelNo, EmpOrBusAdrs,
                EmpOrBusCountry, EmpOrBusZIP
            ) VALUES (?, ?, ?, ?, ?, ?)`;

            db.query(employerInsertSql, [
                tempData.employerName, tempData.employerWorkNature, tempData.employerTel,
                tempData.employerAdrs, tempData.employerCountry, tempData.employerZip
            ], (err, employerResult) => {
                if (err) {
                    console.error('Error inserting employer data:', err);
                    return res.status(500).json({ error: 'Database error inserting employer data.' });
                }

                employerCode = employerResult.insertId;
                insertApplicant(employerCode, tempData, res);
            });
        }
    });
}

function insertApplicant(employerCode, tempData, res) {
    const applicantInsertSql = `INSERT INTO APPLICANT (
        ApplicantName, Salutation, Alias, Age, Birthdate, Birthplace, CivilStatus,
        Nationality, Height, Weight, Sex, PresentAddress, PrsntAdrsCountry, PrsntAdrsZIP,
        PermanentAddress, PermntAdrsCountry, PermntAdrsZIP, Occupation, Position, ApplicantWorkNature,
        SourceOfFunds, GrossAnnualIncome, NetWorth, DateHired, DateOfRegularization, MonthlyIncome,
        SSSID, TINID, OtherID, OtherIDNumber, OtherID2, otherid2number, MobileNumber, TelNo, EmailAddress, EmployerCode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(applicantInsertSql, [
        tempData.fullname, tempData.salutation, tempData.alias, tempData.age, tempData.bday,
        tempData.bplace, tempData.civil_status, tempData.nationality, tempData.height, tempData.weight,
        tempData.sex, tempData.ps_address, tempData.ps_country, tempData.ps_zip, tempData.pm_address,
        tempData.pm_country, tempData.pm_zip, tempData.occupation, tempData.position, tempData.work_nature,
        tempData.sof, tempData.gai, tempData.nw, tempData.hired, tempData.regular, tempData.income,
        tempData.sss, tempData.tin, tempData.otherid, tempData.otheridnum, tempData.otherid2, tempData.otherid2number,
        tempData.mobile, tempData.tel, tempData.email, employerCode
    ], (err, applicantResult) => {
        if (err) {
            console.error('Error inserting applicant data:', err);
            return res.status(500).json({ error: 'Database error inserting applicant data.' });
        }

        const applicantId = applicantResult.insertId;

        insertBeneficiaries(applicantId, tempData, res);
    });
}

function insertBeneficiaries(applicantId, tempData, res) {
    const beneficiaryInsertSql = `INSERT INTO BENEFICIARY (
        ApplicantID, BeneficiaryName, BeneficiaryDOB, BeneficiarySex, BeneficiaryRelationship,
        BeneficiaryPrcntShare, BeneficiaryType, BeneficiaryDesignation, BeneficiaryPOB,
        BeneficiaryNationality, BeneficiaryPrsntAdrs, BeneficiaryCountry, BeneficiaryZIP,
        BeneficiaryMobileNum, BeneficiaryTelNo, BeneficiaryEmailAdrs
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const beneficiaries = [
        [
            applicantId, tempData.beneficiary1Name, tempData.beneficiary1Bday, tempData.beneficiary1Sex,
            tempData.beneficiary1Relationship, tempData.beneficiary1Share, tempData.beneficiary1Type,
            tempData.beneficiary1Designation, tempData.beneficiary1Bplace, tempData.beneficiary1Nationality,
            tempData.beneficiary1PsAddress, tempData.beneficiary1PsCountry, tempData.beneficiary1PsZip,
            tempData.beneficiary1Mobile, tempData.beneficiary1Tel, tempData.beneficiary1Email
        ]
    ];

    if (tempData.beneficiary2Name) {
        beneficiaries.push([
            applicantId, tempData.beneficiary2Name, tempData.beneficiary2Bday, tempData.beneficiary2Sex,
            tempData.beneficiary2Relationship, tempData.beneficiary2Share, tempData.beneficiary2Type,
            tempData.beneficiary2Designation, tempData.beneficiary2Bplace, tempData.beneficiary2Nationality,
            tempData.beneficiary2PsAddress, tempData.beneficiary2PsCountry, tempData.beneficiary2PsZip,
            tempData.beneficiary2Mobile, tempData.beneficiary2Tel, tempData.beneficiary2Email
        ]);
    }

    beneficiaries.forEach(beneficiary => {
        db.query(beneficiaryInsertSql, beneficiary, (err) => {
            if (err) {
                console.error('Error inserting beneficiary data:', err);
                return res.status(500).json({ error: 'Database error inserting beneficiary data.' });
            }
        });
    });

    // res.redirect(`/userProfile?applicantId=${applicantId}`);
    res.status(200).json({applicantId});
}

// Route for user login
app.post('/login', (req, res) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).send('Please fill in the requirements.');
    }

    const loginSql = 'SELECT * FROM LOGIN WHERE Username = ? AND Password = ?';
    db.query(loginSql, [Username, Password], (err, results) => {
        if (err) {
            console.error('Error authenticating user: ', err);
            return res.status(500).send('Login failed. Please try again.');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid Inputs.');
        }

        const user = results[0];

        // Retrieving ApplicantID through EmailAddress
        const getApplicantIdSql = 'SELECT ApplicantID FROM APPLICANT WHERE EmailAddress = ?';
        db.query(getApplicantIdSql, [user.EmailAddress], (err, applicantResult) => {
            if (err) {
                console.error('Error retrieving applicant ID:', err);
                return res.status(500).send('Error retrieving applicant details.');
            }

            if (applicantResult.length === 0) {
                return res.status(404).send('Applicant not found.');
            }

            const applicantId = applicantResult[0].ApplicantID;
            // req.sessioncookie.user = user;

            res.status(200).json({applicantId});
        });
    });
});

// Serve static files from the 'customer' directory
app.use(express.static(path.join(__dirname, 'customer')));

// app.get('/', (req, res) => {
//     return res.json("From backend");
// })

app.get('/applicants', (req, res) => {
    const sql = "SELECT * FROM APPLICANT";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No records found in applicant table.');
        }
        return res.status(200).json(data);
    });
}); 

app.get('/applicants/:ApplicantID', (req, res) => {
    const ApplicantID = req.params.ApplicantID;
    const sql = "SELECT * FROM APPLICANT WHERE ApplicantID = ?";
    db.query(sql, [ApplicantID], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No records found in applicant table.');
        }
        return res.status(200).json(data[0]);
    });
});

app.put('/applicants/:ApplicantID', (req, res) => {
    const ApplicantID = req.params.ApplicantID;
    const {
        ApplicantName,
        Salutation,
        Alias,
        Age,
        Birthdate,
        Birthplace,
        CivilStatus,
        Nationality,
        Height,
        Weight,
        Sex,
        PresentAddress,
        PrsntAdrsCountry,
        PrsntAdrsZIP,
        PermanentAddress,
        PermntAdrsCountry,
        PermntAdrsZIP,
        Occupation,
        Position,
        ApplicantWorkNature,
        SourceOfFunds,
        GrossAnnualIncome,
        NetWorth,
        DateHired,
        DateOfRegularization,
        MonthlyIncome,
        SSSID,
        TINID,
        OtherID,
        OtherIDNumber,
        OtherID2,
        OtherID2Number,
        MobileNumber,
        TelNo,
        EmailAddress,
        EmployerCode
    } = req.body;
    const sql = `UPDATE APPLICANT SET ApplicantName = ?, Salutation = ?, Alias = ?, Age = ?, Birthdate = ?, Birthplace = ?, 
        CivilStatus = ?, Nationality = ?, Height = ?, Weight = ?, Sex = ?, PresentAddress = ?, PrsntAdrsCountry = ?, 
        PrsntAdrsZIP = ?, PermanentAddress = ?, PermntAdrsCountry = ?, PermntAdrsZIP = ?, Occupation = ?, Position = ?, 
        ApplicantWorkNature = ?, SourceOfFunds = ?, GrossAnnualIncome = ?, NetWorth = ?, DateHired = ?, DateOfRegularization = ?,
        MonthlyIncome = ?, SSSID = ?, TINID = ?, OtherID = ?, OtherIDNumber = ?, OtherID2 = ?, OtherID2Number = ?,
        MobileNumber = ?, TelNo = ?, EmailAddress = ?, EmployerCode = ? WHERE ApplicantID = ?`;
    const values = [
        ApplicantName,
        Salutation,
        Alias,
        Age,
        Birthdate,
        Birthplace,
        CivilStatus,
        Nationality,
        Height,
        Weight,
        Sex,
        PresentAddress,
        PrsntAdrsCountry,
        PrsntAdrsZIP,
        PermanentAddress,
        PermntAdrsCountry,
        PermntAdrsZIP,
        Occupation,
        Position,
        ApplicantWorkNature,
        SourceOfFunds,
        GrossAnnualIncome,
        NetWorth,
        DateHired,
        DateOfRegularization,
        MonthlyIncome,
        SSSID,
        TINID,
        OtherID,
        OtherIDNumber,
        OtherID2,
        OtherID2Number,
        MobileNumber,
        TelNo,
        EmailAddress,
        EmployerCode,
        ApplicantID
      ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database update error' });
        }
        if (data.affectedRows === 0) {
            console.log('Update success');
        }
        return res.status(200).json({ message: 'Update successful' });
    });
});

app.delete('/applicants/:ApplicantID', (req, res) => {
    const ApplicantID = req.params.ApplicantID;
    const sql = `DELETE FROM APPLICANT WHERE ApplicantID = ?`;
    db.query(sql, ApplicantID, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database delete error' });
        }
        if (data.affectedRows === 0) {
            console.log('Delete success');
        }
        return res.status(200).json({ message: 'Delete successful' });
    });
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM LOGIN";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No records found in login table.');
        }
        return res.status(200).json(data);
    });
});

app.get('/users/:UserID', (req, res) => {
    const UserID = req.params.UserID;
    const sql = "SELECT * FROM LOGIN WHERE UserID = ?";
    db.query(sql, [UserID], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No records found in login table.');
        }
        return res.status(200).json(data[0]);
    });
});

app.put('/users/:UserID', (req, res) => {
    const UserID = req.params.UserID;
    const {
        EmailAddress,
        Username,
        Password
    } = req.body;
    const sql = `UPDATE LOGIN SET EmailAddress = ?, Username = ?, Password = ? WHERE UserID = ?`;
    const values = [
        EmailAddress,
        Username,
        Password,
        UserID
      ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database update error' });
        }
        if (data.affectedRows === 0) {
            console.log('Update success');
        }
        return res.status(200).json({ message: 'Update successful' });
    });
});

app.delete('/users/:UserID', (req, res) => {
    const UserID = req.params.UserID;
    const sql = `DELETE FROM LOGIN WHERE UserID = ?`;
    db.query(sql, UserID, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database delete error' });
        }
        if (data.affectedRows === 0) {
            console.log('Delete success');
        }
        return res.status(200).json({ message: 'Delete successful' });
    });
});

app.get('/employers', (req, res) => {
    const sql = "SELECT * FROM EMPLOYER";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No records found in employer table.');
        }
        return res.status(200).json(data);
    });
});

// For company details in applicant profile
app.get('/employers/:ApplicantID/:EmployerCode', (req, res) => {
    const ApplicantID = req.params.ApplicantID;
    const EmployerCode = req.params.EmployerCode;
    const sql = `SELECT e.*
                FROM EMPLOYER e
                JOIN APPLICANT a ON e.EmployerCode = a.EmployerCode
                WHERE a.ApplicantID = ? AND e.EmployerCode = ?`;
    db.query(sql, [ApplicantID, EmployerCode], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No records found in employer table.');
        }
        return res.status(200).json(data[0]);
    });
});

// For company details viewed from company relation
app.get('/employers/:EmployerCode', (req, res) => {
    const EmployerCode = req.params.EmployerCode;
    const sql = `SELECT *
                FROM EMPLOYER 
                WHERE EmployerCode = ?`;
    db.query(sql, [EmployerCode], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No records found in employer table.');
        }
        return res.status(200).json(data[0]);
    });
});

app.put('/employers/:EmployerCode', (req, res) => {
    const EmployerCode = req.params.EmployerCode;
    const {
        EmpOrBusName,
        EmpOrBusNature,
        EmpOrBusTelNo,
        EmpOrBusAdrs,
        EmpOrBusCountry,
        EmpOrBusZIP
    } = req.body;
    const sql = `UPDATE EMPLOYER SET EmpOrBusName = ?, EmpOrBusNature = ?, EmpOrBusTelNo = ?, EmpOrBusAdrs = ?, EmpOrBusCountry = ?, EmpOrBusZIP = ? WHERE EmployerCode = ?`;
    const values = [
        EmpOrBusName,
        EmpOrBusNature,
        EmpOrBusTelNo,
        EmpOrBusAdrs,
        EmpOrBusCountry,
        EmpOrBusZIP,
        EmployerCode
      ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database update error' });
        }
        if (data.affectedRows === 0) {
            console.log('Update success');
        }
        return res.status(200).json({ message: 'Update successful' });
    });
});

app.delete('/employers/:EmployerCode', (req, res) => {
    const EmployerCode = req.params.EmployerCode;
    const sql = `DELETE FROM EMPLOYER WHERE EmployerCode = ?`;
    db.query(sql, EmployerCode, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database delete error' });
        }
        if (data.affectedRows === 0) {
            console.log('Delete success');
        }
        return res.status(200).json({ message: 'Delete successful' });
    });
});

app.post('/register', (req, res) => {
    const { email, username, password } = req.body;

    // Validate input
    if (!email || !username || !password) {
        return res.status(400).send('Please fill in all fields.');
    }

    // Insert into database
    const sql = 'INSERT INTO LOGIN (EmailAddress, Username, Password) VALUES (?, ?, ?)';
    db.query(sql, [email, username, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            console.log(email, username, password);
            return res.status(500).send('Registration failed.');
        }
        return res.status(200).send('Registration successful.')
    });
});

app.get('/beneficiaries', (req, res) => {
    const sql = "SELECT * FROM BENEFICIARY";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No records found in beneficiary table.');
        }
        return res.status(200).json(data);
    });
});

app.get('/beneficiaries/:ApplicantID/:BeneficiaryCode', (req, res) => {
    const { ApplicantID, BeneficiaryCode } = req.params;
    const sql = `SELECT b.*, a.ApplicantName
                FROM BENEFICIARY b
                JOIN APPLICANT a ON b.ApplicantID = a.ApplicantID
                WHERE b.ApplicantID = ? AND b.BeneficiaryCode = ?`;
    db.query(sql, [ApplicantID, BeneficiaryCode], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No records found in applicant table.');
            return res.status(404).json({ error: 'No records found' });
        }
        return res.status(200).json(data[0]);
    });
});

app.get('/primarybeneficiaries/:ApplicantID', (req, res) => {
    const ApplicantID = req.params.ApplicantID;
    const sql = `SELECT b.*, a.ApplicantName
                FROM BENEFICIARY b
                JOIN APPLICANT a ON b.ApplicantID = a.ApplicantID
                WHERE a.ApplicantID = ? 
                AND b.BeneficiaryType = 'P'`;
    db.query(sql, [ApplicantID], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No primary beneficiaries found for the specified ApplicantID.');
            return res.status(404).json({ message: 'No primary beneficiaries found.' });
        }
        return res.status(200).json(data[0]);
    });
});

app.get('/secondarybeneficiaries/:ApplicantID', (req, res) => {
    const ApplicantID = req.params.ApplicantID;
    const sql = `SELECT b.*, a.ApplicantName
                FROM BENEFICIARY b
                JOIN APPLICANT a ON b.ApplicantID = a.ApplicantID
                WHERE a.ApplicantID = ? 
                AND b.BeneficiaryType = 'S'`;
    db.query(sql, [ApplicantID], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length === 0) {
            console.log('No secondary beneficiaries found for the specified ApplicantID.');
            return res.status(404).json({ message: 'No secondary beneficiaries found.' });
        }
        return res.status(200).json(data[0]);
    });
});

app.put('/beneficiaries/:ApplicantID/:BeneficiaryCode', (req, res) => {
    const { ApplicantID, BeneficiaryCode } = req.params;
    const {
        BeneficiaryName,
        BeneficiaryDOB,
        BeneficiarySex,
        BeneficiaryRelationship,
        BeneficiaryPrcntShare,
        BeneficiaryType,
        BeneficiaryDesignation,
        BeneficiaryPOB,
        BeneficiaryNationality,
        BeneficiaryPrsntAdrs,
        BeneficiaryCountry,
        BeneficiaryZIP,
        BeneficiaryMobileNum,
        BeneficiaryTelNo,
        BeneficiaryEmailAdrs
    } = req.body;
    const sql = `UPDATE BENEFICIARY SET BeneficiaryName = ?, BeneficiaryDOB = ?, BeneficiarySex = ?, BeneficiaryRelationship = ?, BeneficiaryPrcntShare = ?, BeneficiaryType = ?, BeneficiaryDesignation = ?, BeneficiaryPOB = ?, BeneficiaryNationality = ?, BeneficiaryPrsntAdrs = ?, BeneficiaryCountry = ?, BeneficiaryZIP = ?, BeneficiaryMobileNum = ?, BeneficiaryTelNo = ?, BeneficiaryEmailAdrs = ? WHERE BeneficiaryCode = ? AND ApplicantID = ?`;
    const values = [
        BeneficiaryName,
        BeneficiaryDOB,
        BeneficiarySex,
        BeneficiaryRelationship,
        BeneficiaryPrcntShare,
        BeneficiaryType,
        BeneficiaryDesignation,
        BeneficiaryPOB,
        BeneficiaryNationality,
        BeneficiaryPrsntAdrs,
        BeneficiaryCountry,
        BeneficiaryZIP,
        BeneficiaryMobileNum,
        BeneficiaryTelNo,
        BeneficiaryEmailAdrs,
        BeneficiaryCode,
        ApplicantID
      ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database update error' });
        }
        if (data.affectedRows === 0) {
            console.log('Update success');
        }
        return res.status(200).json({ message: 'Update successful' });
    });
});

app.delete('/beneficiaries/:ApplicantID/:BeneficiaryCode', (req, res) => {
    const { ApplicantID, BeneficiaryCode } = req.params;
    const sql = `DELETE FROM BENEFICIARY WHERE ApplicantID = ? AND BeneficiaryCode = ?`;
    db.query(sql, [ApplicantID, BeneficiaryCode], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database delete error' });
        }
        if (data.affectedRows === 0) {
            console.log('Delete success');
        }
        return res.status(200).json({ message: 'Delete successful' });
    });
});

//Route for 'apply.jsx'
app.get('/apply', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'customer', 'pages', 'apply.jsx'));
});

//Route for 'user-profile.html'
app.get('/user-profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer', 'user-profile.html'));
});

//Route for 'beneficiary1-profile.html'
app.get('/beneficiary1-profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer', 'beneficiary1-profile.html'));
});

//Route for 'beneficiary2-profile.html'
app.get('/beneficiary2-profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer', 'beneficiary2-profile.html'));
});

//Root route to handle other requests or home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});