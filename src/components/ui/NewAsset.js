import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetchPrivate from "../../modules/hooks/useFetchPrivate";
import useGlobal from "../../modules/hooks/useGlobal";
import Loading from "../loading/Loading";
import styles from "../../assets/styles/NewAsset.module.css";

const NewAsset = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      },
      size: 0,
      type: "",
      rooms: {
        rooms: 0,
        bedrooms: 0,
        bathrooms: 0,
        parkingSpaces: 0,
      },
      extra: {
        laundry: false,
        kitchen: false,
        suite: false,
        office: false,
        balcony: false,
        gourmetBalcony: false,
      },
      services: {
        petFriendly: false,
        airConditioning: false,
        internet: false,
        locker: false,
        elevator: false,
        generator: false,
        furnished: false,
        concierge: false,
        sauna: false,
        gym: false,
        playRoom: false,
        babyRoom: false,
        gamesRoom: false,
        gourmetArea: false,
        partyRoom: false,
        barbecue: false,
        swimmingPool: false,
      },
      security: {
        safety24hours: false,
        gatedCondominium: false,
        intercom: false,
        alarmSystem: false,
        watcher: false,
      },
      status: {
        selling: false,
        rental: false,
      },
      values: {
        monthlyCondominium: 0,
        annualTax: 0,
        sellingPrice: 0,
        rentalPrice: 0,
      },
      owners: [
        {
          name: "",
          phoneNumber: "",
          email: "",
        },
      ],
      images: [],
      description: "",
    },
    mode: "onTouched",
  });
  const { fields, append, remove } = useFieldArray({
    name: "owners",
    control,
  });
  const sellingWatcher = watch("status.selling", false);
  const rentalWatcher = watch("status.rental", false);
  const gatedCondominiumWatcher = watch("security.gatedCondominium", false);
  const [message, setMessage] = useState("");
  const [occurredError, setOccurredError] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [enumValues, setEnumValues] = useState([]);
  const fetchPrivate = useFetchPrivate();
  const { auth } = useGlobal();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const getAssetsEnum = async () => {
      try {
        const response = await fetchPrivate(
          "http://localhost:3500/assets/newasset",
          {
            method: "GET",
            signal: controller.signal,
            credentials: "include",
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          setOccurredError(true);
          if ([401, 403, 500].includes(response?.status)) {
            setMessage(responseData?.message);
          } else {
            setMessage("Falha na obtenção dos dados");
          }
        } else {
          setOccurredError(false);
          if (response.status === 204) {
            setMessage(responseData?.message);
          } else {
            console.log(responseData);
            mounted && setEnumValues(responseData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAssetsEnum();

    return () => {
      mounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileInput = (e) => {
    const files = e.target.files;
    const convertedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        convertedFiles.push(e.target.result);
        if (i === files.length - 1) {
          setImageFiles([...imageFiles, ...convertedFiles]);
        }
      };
    }
  };

  const handleRemoveImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
  };

  const submitData = async (data) => {
    data.images = [...imageFiles];
    data.username = auth.username;
    console.log(data);
    let mounted = true;
    const controller = new AbortController();

    try {
      const response = await fetchPrivate(
        "http://localhost:3500/assets/newasset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          signal: controller.signal,
          credentials: "include",
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        setOccurredError(true);
        if ([400, 409, 500].includes(response?.status)) {
          setMessage(responseData?.message);
        }
      } else {
        setOccurredError(false);
        mounted && setMessage(responseData?.message);
        reset();
      }
    } catch (error) {
      setOccurredError(true);
      setMessage("Falha na criação do imóvel");
    }

    return () => {
      mounted = false;
      controller.abort();
    };
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitData)}>
      <p className={occurredError ? styles.error : styles.success}>{message}</p>

      <h2 className={styles.block_title}>Endereço</h2>
      <label className={styles.label}>Logradouro:</label>
      <input
        className={styles.l_input}
        {...register("address.street", {
          pattern: {
            value: /^[a-zA-Z0-9. ].{3,50}$/,
            message: "Somente letras e números",
          },
          required: "Campo obrigatório.",
        })}
        type="text"
      />
      <p className={styles.error}>{errors.address?.street?.message}</p>
      <div className={styles.fields_wrapper}>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Número:</label>
          <input
            className={styles.l_input}
            {...register("address.number", {
              pattern: {
                value: /^[a-zA-Z0-9. ].{1,15}$/,
                message: "Somente letras e números",
              },
              required: "Campo obrigatório.",
            })}
            type="text"
          />
          <p className={styles.error}>{errors.address?.number?.message}</p>
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Complemento:</label>
          <input
            className={styles.l_input}
            {...register("address.complement")}
            type="text"
          />
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Bairro:</label>
          <input
            className={styles.l_input}
            {...register("address.neighborhood", {
              pattern: {
                value: /^[a-zA-Z0-9. ].{1,15}$/,
                message: "Somente letras e números",
              },
              required: "Campo obrigatório.",
            })}
            type="text"
          />
          <p className={styles.error}>
            {errors.address?.neighborhood?.message}
          </p>
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Cidade:</label>
          <input
            className={styles.l_input}
            {...register("address.city", {
              pattern: {
                value: /^[a-zA-Z0-9. ].{1,50}$/,
                message: "Somente letras e números",
              },
              required: "Campo obrigatório.",
            })}
            type="text"
          />
          <p className={styles.error}>{errors.address?.city?.message}</p>
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Estado:</label>
          <input
            className={styles.l_input}
            {...register("address.state", {
              pattern: {
                value: /^[a-zA-Z0-9. ].{1,50}$/,
                message: "Somente letras e números",
              },
              required: "Campo obrigatório.",
            })}
            type="text"
          />
          <p className={styles.error}>{errors.address?.state?.message}</p>
        </div>
      </div>

      <h2 className={styles.block_title}>Características</h2>
      <div className={styles.fields_wrapper}>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Tamanho (m²):</label>
          <input
            className={styles.l_input}
            {...register("size", {
              required: "Campo obrigatório",
              validate: (value) => value >= 0 || "Somente números positivos",
              valueAsNumber: true,
            })}
            type="number"
          />
          <p className={styles.error}>{errors.size?.message}</p>
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Tipo:</label>
          <select
            className={styles.xl_input}
            {...register("type", {
              required: "Campo obrigatório.",
            })}
          >
            {enumValues.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          <p className={styles.error}>{errors.type?.message}</p>
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Salas:</label>
          <input
            className={styles.l_input}
            {...register("rooms.rooms", {
              validate: (value) => value >= 0 || "Somente números positivos",
              valueAsNumber: true,
            })}
            type="number"
          />
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Quartos:</label>
          <input
            className={styles.l_input}
            {...register("rooms.bedrooms", {
              validate: (value) => value >= 0 || "Somente números positivos",
              valueAsNumber: true,
            })}
            type="number"
          />
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Banheiros:</label>
          <input
            className={styles.l_input}
            {...register("rooms.bathrooms", {
              validate: (value) => value >= 0 || "Somente números positivos",
              valueAsNumber: true,
            })}
            type="number"
          />
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>Vagas:</label>
          <input
            className={styles.l_input}
            {...register("rooms.parkingSpaces", {
              validate: (value) => value >= 0 || "Somente números positivos",
              valueAsNumber: true,
            })}
            type="number"
          />
        </div>
      </div>
      <br />
      <div className={styles.section_wrapper}>
        <div className={styles.column_wrapper}>
          <div className={styles.checkbox_wrapper}>
            <input {...register("extra.laundry")} type="checkbox" />
            <label className={styles.label}>Área de serviço</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("extra.kitchen")} type="checkbox" />
            <label className={styles.label}>Cozinha</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("extra.suite")} type="checkbox" />
            <label className={styles.label}>Suítes</label>
          </div>
        </div>
        <div className={styles.column_wrapper}>
          <div className={styles.checkbox_wrapper}>
            <input {...register("extra.office")} type="checkbox" />
            <label className={styles.label}>Escritório</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("extra.balcony")} type="checkbox" />
            <label className={styles.label}>Varanda</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("extra.gourmetBalcony")} type="checkbox" />
            <label className={styles.label}>Varanda gourmet</label>
          </div>
        </div>
      </div>

      <h2 className={styles.block_title}>Serviços e Comodidades</h2>
      <div className={styles.section_wrapper}>
        <div className={styles.column_wrapper}>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.petFriendly")} type="checkbox" />
            <label className={styles.label}>Pet Friendly</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.airConditioning")} type="checkbox" />
            <label className={styles.label}>Ar - condicionado</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.internet")} type="checkbox" />
            <label className={styles.label}>Internet</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.locker")} type="checkbox" />
            <label className={styles.label}>Locker</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.elevator")} type="checkbox" />
            <label className={styles.label}>Elevador</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.generator")} type="checkbox" />
            <label className={styles.label}>Gerador</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.furnished")} type="checkbox" />
            <label className={styles.label}>Mobiliado</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.concierge")} type="checkbox" />
            <label className={styles.label}>Portaria</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.sauna")} type="checkbox" />
            <label className={styles.label}>Sauna</label>
          </div>
        </div>
        <div className={styles.column_wrapper}>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.gym")} type="checkbox" />
            <label className={styles.label}>Academia</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.playRoom")} type="checkbox" />
            <label className={styles.label}>Espaço Teens</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.babyRoom")} type="checkbox" />
            <label className={styles.label}>Espaço Baby</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.gamesRoom")} type="checkbox" />
            <label className={styles.label}>Salão de jogos</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.gourmetArea")} type="checkbox" />
            <label className={styles.label}>Área Gourmet</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.partyRoom")} type="checkbox" />
            <label className={styles.label}>Salão de festas</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.barbecue")} type="checkbox" />
            <label className={styles.label}>Churrasqueira</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("services.swimmingPool")} type="checkbox" />
            <label className={styles.label}>Piscina</label>
          </div>
        </div>
      </div>

      <h2 className={styles.block_title}>Segurança</h2>
      <div className={styles.section_wrapper}>
        <div className={styles.column_wrapper}>
          <div className={styles.checkbox_wrapper}>
            <input {...register("security.safety24hours")} type="checkbox" />
            <label className={styles.label}>Segurança 24 horas</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("security.gatedCondominium")} type="checkbox" />
            <label className={styles.label}>Condomínio fechado</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("security.intercom")} type="checkbox" />
            <label className={styles.label}>Intefone</label>
          </div>
        </div>
        <div className={styles.column_wrapper}>
          <div className={styles.checkbox_wrapper}>
            <input {...register("security.alarmSystem")} type="checkbox" />
            <label className={styles.label}>Alarme</label>
          </div>
          <div className={styles.checkbox_wrapper}>
            <input {...register("security.watcher")} type="checkbox" />
            <label className={styles.label}>Vigia</label>
          </div>
        </div>
      </div>

      <h2 className={styles.block_title}>Venda/Locação</h2>
      <div className={styles.section_wrapper}>
        <div className={styles.column_wrapper}>
          <div className={styles.checkbox_wrapper}>
            <input {...register("status.selling")} type="checkbox" />
            <label className={styles.label}>Venda</label>
            {sellingWatcher ? (
              <div className={styles.section_wrapper}>
                <label className={styles.label}>
                  Preço:
                  <input
                    className={styles.status_input}
                    {...register("values.sellingPrice", {
                      validate: (value) =>
                        value >= 0 || "Somente números positivos",
                      valueAsNumber: true,
                    })}
                    type="number"
                  />
                </label>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.column_wrapper}>
          <div className={styles.checkbox_wrapper}>
            <input {...register("status.rental")} type="checkbox" />
            <label className={styles.label}>Locação</label>
            {rentalWatcher ? (
              <div className={styles.section_wrapper}>
                <label className={styles.label}>
                  Preço:
                  <input
                    className={styles.status_input}
                    {...register("values.rentalPrice", {
                      validate: (value) =>
                        value >= 0 || "Somente números positivos",
                      valueAsNumber: true,
                    })}
                    type="number"
                  />
                </label>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <h2 className={styles.block_title}>Taxas</h2>
      <div className={styles.checkbox_wrapper}>
        <div className={styles.input_wrapper}>
          <label className={styles.label}>IPTU (anual):</label>
          <input
            className={styles.m_input}
            {...register("values.annualTax", {
              validate: (value) => value >= 0 || "Somente números positivos",
              valueAsNumber: true,
            })}
            type="number"
          />
        </div>
        {gatedCondominiumWatcher ? (
          <div className={styles.input_wrapper}>
            <label className={styles.label}>Condimínio (mensal):</label>
            <input
              className={styles.s_input}
              {...register("values.monthlyCondominium", {
                validate: (value) => value >= 0 || "Somente números positivos",
                valueAsNumber: true,
              })}
              type="number"
            />
          </div>
        ) : null}
      </div>

      <h2 className={styles.block_title}>Proprietários</h2>
      <div className={styles.column_wrapper}>
        {fields.map((field, index) => {
          return (
            <div className={styles.owner_wrapper} key={field.id}>
              <div className={styles.input_wrapper}>
                <label className={styles.label}>Nome:</label>
                <input
                  className={styles.xl_input}
                  {...register(`owners.${index}.name`, {
                    pattern: {
                      value: /^[a-zA-Z].{1,80}$/,
                      message: "Somente letras",
                    },
                    required: "Campo obrigatório.",
                  })}
                  type="text"
                />
              </div>
              <div className={styles.input_wrapper}>
                <label className={styles.label}>Telefone:</label>
                <input
                  className={styles.xl_input}
                  {...register(`owners.${index}.phoneNumber`, {
                    pattern: {
                      value: /^[0-9].{1,11}$/,
                      message: "Somente números",
                    },
                    required: "Campo obrigatório.",
                  })}
                  type="text"
                />
              </div>
              <div className={styles.input_wrapper}>
                <label className={styles.label}>Email:</label>
                <input
                  className={styles.xl_input}
                  {...register(`owners.${index}.email`)}
                  type="email"
                />
              </div>
              {index > 0 ? (
                <button type="button" onClick={() => remove(index)}>
                  <FontAwesomeIcon className={styles.icon} icon={faTrash} />
                </button>
              ) : null}
            </div>
          );
        })}
        <br />
        <button
          type="button"
          onClick={() => append({ name: "", phoneNumber: "", email: "" })}
        >
          Adicionar
        </button>
      </div>

      <h2 className={styles.block_title}>Imagens</h2>
      <div className={styles.input_img_wrapper}>
        <input
          {...register("images")}
          type="file"
          multiple
          onChange={(e) => {
            handleFileInput(e);
          }}
        />
        <br />

        <div className={styles.image_block}>
          {imageFiles.map((image, index) => (
            <div className={styles.image_wrapper} key={index}>
              <img className={styles.img} src={image} alt={`imagem ${index}`} />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                <FontAwesomeIcon className={styles.icon} icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <h2 className={styles.block_title}>Descrição</h2>
      <textarea
        className={styles.text_area}
        {...register("description", {
          required: "Campo obrigatório",
        })}
        required
      />
      <br />
      <div className={styles.button_wrapper}>
        <button type="submit">Criar imovel</button>
      </div>
      <br />
    </form>
  );
};

export default NewAsset;
