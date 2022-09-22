import React, { useState } from "react";
import "./Style.css";

function App() {

    let [qiymat, setQiymat] = useState(null);
    let [text, setText] = useState();
    const [modal, setModal] = useState(true);
    const [showes, setShow] = useState({
        qiymat: true,
        data: "",
        nomer: null,
    });
    const [data, setData] = useState([]);
    const [inputData, setInputData] = useState({
        title: "hozircha mavjud emas!",
        rasm: "",
        nomi: "",
        narxi: "",
        sanoq: 0,
    })

    function minus(i) {
        if (i.sanoq > 0) {
            setData(data.map((p) => (i == p ? { ...p, sanoq: i.sanoq - 1 } : p)));
        }
    }

    function plus(i) {
        setData(data.map((p) => (i === p ? { ...p, sanoq: i.sanoq + 1 } : p)));
    }

    // modal oyna

    let modalFunc = () => {
        setQiymat(null);
        setText("malumot qoshish");
        setModal(!modal);
        setInputData({ ...inputData, title: "hozircha mavjud emas!" });
        setInputData({
            nomi: "",
            narxi: "",
            sanoq: 0,
        });
    };

    // inputdagi malumotlarni olish

    let input_change = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    let inputRasm_change = (e) => {
        setInputData({
            ...inputData,
            rasm: URL.createObjectURL(e.target.files[0]),
            title: e.target.files[0].name,
        });
    };

    // malumotlarni tahrirlash 

    let tahrirla = (i) => {
        setText("malumot tahrirlash");
        setQiymat(i);
        setModal(false);
        setInputData({
            ...inputData,
            rasm: i.rasm,
            nomi: i.nomi,
            narxi: i.narxi,
            title: i.title,
        });
    };

    // malumot jonatish

    let dataSubmit = (e) => {
        e.preventDefault();
        if (qiymat === null) {
            if (
                inputData.narxi !== "" &&
                inputData.nomi != "" &&
                inputData.rasm != ""
            ) {
                setData([...data, inputData]);
                setModal(!modal);
                setInputData({
                    nomi: "",
                    rasm: "",
                    narxi: "",
                    sanoq: 0,
                });
            } else {
                alert("malumotlarni toliq kiritmadingiz !");
            }
        } else {
            setData(data.map((item) => (item == qiymat ? inputData : item)));
            setModal(!modal);
            setInputData({
                nomi: "",
                rasm: "",
                narxi: "",
                sanoq: 0,
            });
        }

    };

    // malumotni ochirish uchun 

    let ochir = (i) => {
        let filtr = data.filter((item) => item !== i);
        setData(filtr);
    }

    // malumotlarni korish

    let korsat = (i) => {
        setShow({qiymat : !showes.qiymat, data: i});
    };


    return (
        <>
            <div className="container">
                <div>
                    <button onClick={modalFunc}>malumot qoshish</button>
                </div>
                <div className={modal ? "modal_oyna" : "modal_oyna active"} onClick={() => setModal(true)}>
                    <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => dataSubmit(e)} className={modal ? " " : "actives"}>
                        <h1>{text}</h1>
                        <input type="text" placeholder="nomi" name="nomi" onChange={(e) => input_change(e)} value={inputData.nomi}/>
                        <input type="number" placeholder="narxi" name="narxi" value={inputData.narxi} onChange={(e) => input_change(e)}/>
                        <label htmlFor="rasm">
                            +img: <br /> name:{inputData.title}
                        </label>
                        <input type="file" id="rasm" onChange={(e) => inputRasm_change(e)}/>
                        <button type="submit">Jonat</button>
                    </form>
                </div>
                <div className={showes.qiymat ? "modal_korsat" : "modal_korsat active"} onClick={() => korsat("a")}>
                    <div className={showes.qiymat ? "show_data" : "show_data active"} onClick={(e) => e.stopPropagation()}>
                        <table border={1}>
                            <tbody>
                                <tr>
                                    <th>keys</th>
                                    <th>value</th>
                                </tr>
                                {Object.keys(showes.data).map((item, index) => (
                                    <tr key={index}>
                                        <td>{item}</td>
                                        <td>
                                            {item == "rasm" ? (
                                                <figure>
                                                    <img src={Object.values(showes.data)[index]} alt="" />
                                                </figure>
                                            ) : (
                                                Object.values(showes.data)[index]
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>nomi</th>
                            <th>rasm</th>
                            <th>narxi</th>
                            <th>total</th>
                            <th colSpan={3}>soni</th>
                            <th colSpan={2}>action</th>
                            <th>show</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) =>(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nomi}</td>
                                    <td className="rasm">
                                        <figure>
                                            <img src={item.rasm} alt={item.nomi} />
                                        </figure>
                                    </td>
                                    <td>{item.narxi} som</td>
                                    <td>{item.narxi * item.sanoq} som</td>
                                    <td>
                                        <button onClick={() => minus(item)}>-</button>
                                    </td>
                                    <td>{item.sanoq}</td>
                                    <td>
                                    <button className="green" onClick={() => plus(item)}>+</button>
                                    </td>
                                    <td>
                                        <button className="green" onClick={() => tahrirla(item)}>edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => ochir(item)}>delete</button>
                                    </td>
                                    <td>
                                        <button onClick={() => korsat(item)} className="showes">show</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={11}>
                                    <h1>Malumot yoq...</h1>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;